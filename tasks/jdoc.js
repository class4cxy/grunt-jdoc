/*
 * grunt-jdoc
 * http://www.alloyteam.com/
 *
 * Copyright (c) 2015 jdochen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('jdoc', 'Replace text patterns with applause.', function () {

        var options = grunt.task.current.options({'private': true});
        // 单值标签，该类标签不会以数组的形式存储
        var singleTag = (options.singleTag || []).concat(['function', 'desc', 'namespace', 'class', 'event', 'attribute', 'type', 'prototype']);

        // 根对象
        var docJSON = {};
        // 文档标识匹配
        // -> /** xxx */
        // -> /**
        //     * xxx
        //     */
        var rDocFeature = /\s*\/\*\*([\s\S]*?)\*\//g;
        // 通用文档字段匹配
        // -> @function someFunction
        // -> @desc some describe
        // -> @desc for someParam some describe only for some param
        var rCommField = /\s*\*\s*@([\w.-_]*)\s*(for?\s[\w.-_]*)?\s*([^\n]*)\n/g;
        // 特殊字段匹配处理
        // 目前只有`param`, `example`
        var rSpecialField = {
            param : {
                exp: /\s*\*\s*@param\s*{([^\}]*?)}\s*(\[?[\w.-_]*\]?)([^\n]*)?/g,
                factory: function (holder, all, type, field, tx) {
                    // 可选标识
                    var optional = false;
                    if ( field.indexOf('[') === 0 ) {
                        optional = true;
                        field = field
                            .replace('[', '')
                            .replace(']', '')
                    }
                    holder.push({
                        key: 'param',
                        field: field,
                        type: type,
                        optional: optional,
                        desc: tx
                    });
                }
            },
            example : {
                exp: /@example[^\n]+([^@]+)/g,
                factory: function (holder, all, code) {
                    holder.push({
                        key: 'example',
                        field: code.replace(/\*\s/g, '')
                                   .replace(/\s$/g, '')
                                   .replace(/</g, '&lt;')
                                   .replace(/>/g, '&gt;')
                    })
                }
            }
        };
        // 字段索引
        // 注：不同主题的注释文档会对应不同的处理工厂
        //     这里主要是不同主题的注释归类到不同数据结构中存储
        //     目前支持`function` `attribute` `namespace` `event` `class` `prototype`做为索引
        var fieldIndexFactory = function () {

            function _ns (ns, prop) {
                var arr = ns.split('.');
                var root = docJSON;
                var len = arr.length - 1;
                // var last = arr.pop();
                arr.forEach(function(a, i) {
                    if ( !root[a] ) root[a] = {
                        property : {}
                    };
                    // grunt.log.writeln(typeof i)
                    if ( len === i ) {
                        if ( prop ) root[a].detail = prop;
                        else root = root[a];
                    } else {
                        root = root[a].property;
                    }
                });
                return root;
            }

            function _cm (type, ns, prop) {
                // 检查是否为空间
                if ( ns ) {
                    var re = {detail: prop};
                    var handler, n;
                    var last = ns.lastIndexOf('.');
                    // 存在名字空间，转移到`$namespace`处理
                    if ( last > -1 ) {
                        handler = _ns(ns.substring(0, last));
                        n = ns.substr(last+1);
                    } else {
                        handler = docJSON;
                        n = ns;
                    }
                    if ( type === 'function' ) type = 'property';
                    
                    if ( !handler[type] ) handler[type] = {};
                    handler[type][n] = re;
                }
            }

            function _proto (ns, prop) {
                // 检查ns合法性
                // 注：原型的生成方式需要该类已经存在，否则无法添加prototype属性
                if ( ns && ns.indexOf('.') > -1 ) {
                    var root = docJSON;
                    var space = ns.split('.');
                    var len = space.length;
                    // 类目
                    var cls = space[len-2];
                    // 原型属性或方法名
                    var name = space[len-1];
                    // 存在`namespace`
                    if ( len > 2 ) {
                        for ( var i = 0, l = len - 2; i < l; i++ ) {
                            if ( root = root[space[i]] ) {
                                // do nothing
                            } else {
                                grunt.log.error('can not find the namespace : '+space[i])
                            }
                        }
                    }
                    // 检查空间上是否存在该类
                    if ( root['class'] && root['class'][cls] ) {
                        var proto = root['class'][cls].proto;
                        if ( !proto ) proto = root['class'][cls].proto = {};
                        proto[name] = prop;
                    } else {
                        grunt.log.error('can not find the class : '+cls)
                    }
                }
            }

            return {
                // 处理函数类
                'function' : function (ns, prop) {
                    _cm('function', ns, prop)
                },

                // 按照`function`的格式存储
                'attribute' : function (ns, prop) {
                    _cm('function', ns, prop)
                },

                // 处理名字空间
                'namespace' : _ns,

                // 处理事件类型注释
                'event' : function (ns, prop) {
                    _cm('event', ns, prop)
                },

                // 处理类
                'class' : function (ns, prop) {
                    _cm('class', ns, prop)
                },

                //原型处理
                'prototype' : function (ns, prop) {
                    _proto(ns, prop)
                }
            }
        }();

        // 匹配文档标识
        // 匹配字段标识
        function matchDocFeature (filepath) {
            // reset regular lastIndex
            var content = grunt.file.read(filepath);

            if ( content ) {

                var Slice = Array.prototype.slice;
                // 识别注释标识
                content.replace(rDocFeature, function (all, doc) {
                    if ( doc ) {

                        var fields = [];
                        // var module;
                        var factory;
                        var index;

                        // grunt.log.writeln(doc)
                        // 通用字段匹配
                        doc.replace(rCommField, function (all, key, belong, field) {
                            // grunt.log.writeln('dododo ----- ')
                            // grunt.log.writeln(belong)
                            key = key.replace(/\r/, '');
                            field = field.replace(/\r/, '');
                            
                            if ( key && !rSpecialField.hasOwnProperty(key) ) {

                                fields.push({
                                    key: key,
                                    field: field,
                                    belong: belong ? belong.replace('for ', '') : ''
                                });

                                // 筛选主题字段
                                if ( fieldIndexFactory.hasOwnProperty(key) ) {
                                    factory = key;
                                    index = field;
                                }
                            }
                        });

                        // 特殊字段匹配，处理
                        for ( var i in rSpecialField ) {
                            var item = rSpecialField[i];
                            // reset last Index
                            doc.replace(item.exp, function () {
                                var args = Slice.call(arguments, 0);
                                // inset holder
                                args.unshift(fields);
                                // grunt.log.writeflags(fields)
                                item.factory.apply(null, args)
                            })
                        }
                        // grunt.log.writeln(JSON.stringify(fields))
                        if ( factory ) {
                            // grunt.log.writeln(factory);
                            fieldIndexFactory[factory](index, fields);
                        }
                        // grunt.log.writeln(JSON.stringify(docJSON));
                    }
                })
            }

        }

        // 递归整合相同key到同一数组中
        function handleFields (root, space) {

            root = root || docJSON;
            var tmp = space ? root[space] : root;
            // var singleField = ['function', 'desc', 'namespace', 'class', 'event', 'attribute', 'type', 'prototype'].;
            // array
            if ( tmp.length && tmp.forEach ) {

                var tmpFields = {};
                // 通用处理
                tmp.forEach(function (item) {
                    if ( singleTag.indexOf(item.key) > -1 ) {
                        tmpFields[item.key] = item.field;
                    } else {
                        tmpFields[item.key] = tmp.filter(function (field) {
                            return field.key === item.key ? true : false;
                        });
                    }
                });

                // rewrite
                if ( space ) {
                    // grunt.log.writeln(space);
                    handleParamTree(tmpFields);
                    handleFieldsTree(tmpFields);
                    root[space] = tmpFields;
                }

            // object
            } else {
                for ( var i in tmp ) {
                    handleFields(tmp, i)
                }
            }
        }

        /**
         * 创建`param`层级化关系
         * @param  {String} field 所属字段名
         * @param  {Object} space 所属层级
         * @param  {Object} factory 附属工厂
         */
        function handleParamBelong (field, names, space, factory) {

            var curr = names.shift();
            if ( curr ) {
                // 如果参数下级为空，创建一个新的，用于给下面插入
                if ( space.length === 0 ) {
                    space[0] = {
                        field : curr
                    }
                }
                space.forEach(function (item) {
                    // grunt.log.writeflags(item)
                    if ( item && item.field === curr ) {

                        if ( !item[field] ) {
                            item[field] = [];
                        }
                        if ( names.length === 1 ) {
                            // fix `field` for `param`
                            factory.field = names.shift();

                            item[field].push(factory)
                        } else {
                            handleParamBelong(field, names, item[field], factory);
                        }
                    }
                });
            }
        }

        // 参数层级化
        function handleParamTree (api) {
            var params = api.param;
            if ( params && params.length ) {
                params.forEach(function (param, k) {
                    // callback.result -> ['callback', 'result']
                    var paramNames = param.field.split('.');
                    if ( paramNames && paramNames.length > 1 ) {
                        // 先清除之前的引用
                        params[k] = null;
                        handleParamBelong('param', paramNames, params, param)
                    }
                });
                // clean empty param
                api.param = params.filter(function (param) {
                    return param ? true : false;
                });
            }
        }

        /**
         * 创建其他字段层级化关系
         * @param  {String} field 所属字段名
         * @param  {Object} space 所属层级
         * @param  {Object} factory 附属工厂
         */
        function handleFieldBelong (field, names, space, factory) {

            var curr = names.shift();
            if ( curr ) {
                space.forEach(function (item) {
                    if ( item && item.field === curr ) {
                        if ( names.length === 0 ) {
                            if ( !item[field] ) {
                                item[field] = [];
                            }
                            item[field].push(factory)
                        } else if ( item.param ) {
                            handleFieldBelong(field, names, item.param, factory);
                        }
                    }
                });
            }
        }

        // 其他字段层级化 `note` `support` `importent` etc
        function handleFieldsTree (api) {
            // 排除名单
            var ex = ['function', 'desc', 'param', 'example'];
            if ( api && typeof api === 'object' ) {
                for ( var i in api ) {
                    if ( ex.indexOf(i) === -1 ) {
                    // grunt.log.writeln(i)
                        var field = api[i];
                        // grunt.log.writeflags(field)
                        if ( field && field.length ) {
                            for ( var m = field.length-1; m >= 0; m -- ) {
                                var item = field[m];
                                if ( item.belong ) {
                                    // grunt.log.writeln(item.belong.split('.'))
                                    // field[k] = null;
                                    field.splice(m, 1);
                                    handleFieldBelong(i, item.belong.split('.'), api.param, item)
                                }
                            }
                        }
                    }
                }
            }
        }

        function buildJSONFile () {
            var path = './docs';
            if (!grunt.file.exists(path)) {
                grunt.file.mkdir(path);
            }
            grunt.file.write(path+'/doc.json', JSON.stringify(docJSON));
        }



        grunt.log.writeln('初始化标识解析...');
        this.files.forEach(function (file) {
            // grunt.log.writeflags(filePair);
            file.src.filter(function(filepath) {
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(matchDocFeature);
        });

        grunt.log.writeln('参数归类处理...');
        handleFields();
        grunt.log.writeln('文件生成');
        buildJSONFile();
        grunt.log.writeln('完成！');

    });
};
