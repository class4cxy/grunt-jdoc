/**
 * @method app.checkAppInstalled
 * @description 通过packageName(Android)获取本地指定应用的本版号 ddddd
 * @param {String} identifier 要查询的 identifier。如：Android 微信是 "com.tencent.mm"。
 * @param {Function} callback 回调函数
 * @param {String} callback.result 返回查询结果。正常返回 app 的版本号字符串，若没有查询到则返回 0 字符串
 * @param {String} callback.result.code 返回状态码
 * @example
 * var id = 'com.tencent.mm';
 *
 * qw.app.checkAppInstalled(id, function (ret) {
 *     console.log(ret); // 5.3.1
 * });
 * @support android 4.2
 * @support iOS 4.2
 * @support for callback.result iOS 4.5
 * @note for identifier 属于identifier的注意事项
 * @note for callback.result 属于callback.result的注意事项
 * @note 注意，该选项属于接口级事件
 * @important for identifier 属于identifier的严重事项
 */

mqq.build('mqq.app.checkAppInstalled', {
    android: function(identifier, callback){
        mqq.invoke('QQApi', 'checkAppInstalled', identifier, callback);
    },
    support: {
        android: '4.2'
    }
});