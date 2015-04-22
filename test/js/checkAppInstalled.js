/**
 * @function app.checkAppInstalled
 * @desc 通过packageName(Android)获取本地指定应用的本版号
 *
 * @param {String|Object} identifier 要查询的 identifier。如：Android 微信是 "com.tencent.mm"。
 * @param {Function} callback 回调函数
 * @options for identifier 1
 * @options for identifier 2
 * @options for identifier 3
 * @options for identifier 4
 * @note for identifier 1
 * @note for identifier 2
 * @note for identifier 3
 * @note for identifier 4
 * @param {String|Object} callback.result 返回查询结果。正常返回 app 的版本号字符串，若没有查询到则返回 0 字符串
 *
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.1
 * });
 *
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.2
 * });
 *
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.3
 * });
 *
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.4
 * });
 * <meta itemprop="name" content="这是分享的标题"/>
 * <meta itemprop="image" content="http://imgcache.qq.com/qqshow/ac/v4/global/logo.png" />
 * <meta name="description" itemprop="description" content="这是要分享的内容" />
 *
 * @support iOS not support
 * @support android 4.2
 * @discard 1
 */

/**
 * @attribute app.isAppInstalled
 * @desc 是否安装
 * @support iOS not support
 * @support android 4.2
 */

/**
 * @namespace app
 * @desc 应用模块
 * @support iOS not support
 * @support android 4.2
 */


/**
 * @event qbrowserPullDown
 * @desc 页面下拉刷新是后会抛出该事件
 * @example
 * mqq.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.1
 * });
 * @support iOS 5.3
 * @support android 5.3
 */

/**
 * @class Animal
 * @desc 动物类
 */

/**
 * @class app.Persion
 * @desc 人类
 */

/**
 * @prototype Animal.run
 * @desc 奔跑吧
 * @type Function
 *
 * @param {String} identifier 要查询的 identifier。如：Android 微信是 "com.tencent.mm"。
 * @param {Function} callback 回调函数
 * @param {String} callback.result 返回查询结果。正常返回 app 的版本号字符串，若没有查询到则返回 0 字符串
 *
 */

/**
 * @prototype Animal.sex
 * @desc 性别
 * @type property
 *
 */
mqq.build('mqq.app.checkAppInstalled', {
    android: function(identifier, callback){
        mqq.invoke('QQApi', 'checkAppInstalled', identifier, callback);
    },
    support: {
        android: '4.2'
    }
});