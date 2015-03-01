# grunt-jdoc

> grunt plugin for generate doc form javascript source

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jdoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jdoc');
```

## The "jdoc" task

### Overview
In your project's Gruntfile, add a section named `jdoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jdoc: {
    your_target: {
      // js source file you want to build from
      src: 'test/js/checkAppInstalled.js',
      // the path for `doc.json` generate to
      target: 'docs'
    }
  }
});
```
## js demo - build in @tag

### `@function`
```js
/**
 * @function checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 */
```
If the `function` is on some namespace, for example : `app.checkAppInstalled`
```js
/**
 * @function app.checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 */
```
### `@function` - doc.json
```js
{
  "app": {
    "property": {
      "checkAppInstalled": {
        "detail": {
          "function": "app.checkAppInstalled",
          "desc": "通过packageName(Android)获取本地指定应用的本版号"
        }
      }
    }
  }
}
```

### `@namespace`
If you want to note namespace alone, for example : `app`
```js
/**
 * @namespace app
 * @desc 应用模块
 */
```
### `@namespace` - doc.json
```js
{
  "app": {
    "property": {},
    "detail": {
      "namespace": "app",
      "desc": "应用模块"
    }
  }
}
```

### `@attribute`
```js
/**
 * @attribute isAppInstalled
 * @desc 是否安装标识
 */
```
If the `attribute` is on some namespace, for example : `app.isAppInstalled`
```js
/**
 * @attribute app.isAppInstalled
 * ...
 */
```
### `@attribute` - doc.json
```js
{
  "app": {
    "property": {
      "isAppInstalled": {
        "detail": {
          "attribute": "app.isAppInstalled",
          "desc": "是否安装"
        }
      }
    }
  }
}
```

### `@event`
```js
/**
 * @event qbrowserPullDown
 * @desc 页面下拉刷新是后会抛出该事件
 * @example
 * mqq.addEventListener("qbrowserPullDown", function () {
 *     // your code
 * });
 */
```
### `@event` - doc.json
```js
{
  "event": {
    "qbrowserPullDown": {
      "detail": {
        "event": "qbrowserPullDown",
        "desc": "页面下拉刷新是后会抛出该事件",
        "example": [
          {
            "key": "example",
            "field": "\n mqq.addEventListener(\"qbrowserPullDown\", function () {\r\n     // your code\r\n });\r\n"
          }
        ]
      }
    }
  }
}
```

### `@class`
```js
/**
 * @class Animal
 * @desc 动物类
 */
```
```js
/**
 * @prototype Animal.run
 * @desc 奔跑吧
 * @type Function
 *
 */
```
```js
/**
 * @prototype Animal.sex
 * @desc 性别
 * @type property
 *
 */
```
### `@class` - doc.json
```js
{
  "class": {
    "Animal": {
      "detail": {
        "class": "Animal",
        "desc": "动物类"
      },
      "proto": {
        "run": {
          "prototype": "Animal.run",
          "desc": "奔跑吧",
          "type": "Function"
        },
        "sex": {
          "prototype": "Animal.sex",
          "desc": "性别",
          "type": "property"
        }
      }
    }
  }
}
```
### `@param`
```js
/**
 * @function app.checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 *
 * @param {String} identifier 要查询的 identifier。
 * @param {Function} callback 回调函数
 * @param {String} callback.result 返回查询结果。
 * @options for callback.result 0 - 没安装
 * @options for callback.result 1 - 已安装
 *
 * @note for identifier 这是关于`identifier`的提示
 */
```
### `@param` - doc.json
```js
{
  "app": {
    "property": {
      "checkAppInstalled": {
        "detail": {
          "function": "app.checkAppInstalled",
          "desc": "通过packageName(Android)获取本地指定应用的本版号",
          "options": [],
          "note": [],
          "param": [
            {
              "key": "param",
              "field": "identifier",
              "type": "String",
              "optional": false,
              "desc": " 要查询的 identifier。\r",
              "note": [
                {
                  "key": "note",
                  "field": "这是关于`identifier`的提示",
                  "belong": "identifier"
                }
              ]
            },
            {
              "key": "param",
              "field": "callback",
              "type": "Function",
              "optional": false,
              "desc": " 回调函数\r",
              "param": [
                {
                  "key": "param",
                  "field": "result",
                  "type": "String",
                  "optional": false,
                  "desc": " 返回查询结果。\r",
                  "options": [
                    {
                      "key": "options",
                      "field": "1 - 已安装",
                      "belong": "callback.result"
                    },
                    {
                      "key": "options",
                      "field": "0 - 没安装",
                      "belong": "callback.result"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
}
```
* you can describe `object` by use `.`
* also you can use `for` keyword to extend some specific `param`

### `@example`
```js
/**
 * @function app.checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret);
 * });
 */
```
### `@example` - doc.json
```js
{
  "app": {
    "property": {
      "checkAppInstalled": {
        "detail": {
          "function": "app.checkAppInstalled",
          "desc": "通过packageName(Android)获取本地指定应用的本版号",
          "example": [
            {
              "key": "example",
              "field": "\n mqq.app.checkAppInstalled(id, function (ret) {\r\n     console.log(ret); // 5.3.1\r\n });\r\n"
            }
          ]
        }
      }
    }
  }
}
```
* you can note more than one examples

## js demo - user-defined @tag
* you can use any note tag you want, for example: `@support`, `@note`, `@important` etc.
* every user-defined tag can use `for` keyword to extend some specific `@param`

### `user-defined tag`
```js
/**
 * @function app.checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 *
 * @param {String} identifier 要查询的 identifier。
 * @param {Function} callback 回调函数
 * @param {String} callback.result 返回查询结果。
 *
 * @yourtag this is an user-defined tag of `app.checkAppInstalled`
 * @yourtag2 for callback.result this is an user-defined tag of `callback.result`
 *
 */
```
### `user-defined tag` - doc.json
```js
{
  "app": {
    "property": {
      "checkAppInstalled": {
        "detail": {
          "function": "app.checkAppInstalled",
          "desc": "通过packageName(Android)获取本地指定应用的本版号",
          "yourtag": [
            {
              "key": "yourtag",
              "field": "this is an user-defined tag of `app.checkAppInstalled`",
              "belong": ""
            }
          ],
          "yourtag2": [],
          "param": [
            {
              "key": "param",
              "field": "identifier",
              "type": "String",
              "optional": false,
              "desc": " 要查询的 identifier。\r"
            },
            {
              "key": "param",
              "field": "callback",
              "type": "Function",
              "optional": false,
              "desc": " 回调函数\r",
              "param": [
                {
                  "key": "param",
                  "field": "result",
                  "type": "String",
                  "optional": false,
                  "desc": " 返回查询结果。\r",
                  "yourtag2": [
                    {
                      "key": "yourtag2",
                      "field": "this is an user-defined tag of `callback.result`",
                      "belong": "callback.result"
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
