/**
 * @method app.checkAppInstalledBatch
 * @description 通过packageName(Android)批量获取本地应用的版本号
 * @param {Array|String} identifiers 要查询的 identifier 数组。如：Android 微信是 "com.tencent.mm"
 * @param {Function} callback 回调函数
 * @param {Array|String} callback.result 返回查询结果。正常返回 app 的版本号字符串，若没有查询到则返回 0 字符串
 * @example
 * ```
 * qw.app.checkAppInstalledBatch(["com.tencent.mobileqq", "no.no.no"], function(ret){
 *     console(JSON.stringify(ret)); // ["4.7.1", "0"]
 * });
 * ```
 * @support android 4.2
 * @support iOS 4.2
 */

mqq.build('mqq.app.checkAppInstalledBatch', {
    android: function(identifiers, callback){
        identifiers = identifiers.join('|');

        mqq.invoke('QQApi', 'checkAppInstalledBatch', identifiers, function (result) {
            result = (result || '').split('|');
            callback(result);
        });
    },
    support: {
        android: '4.2'
    }
});


