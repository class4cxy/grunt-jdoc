
/**
 * @method app.downloadApp
 * @description 下载APP
 * @param {Object} params 请求参数
 *   @param {String} params.appid 唯一标示，应用中心使用开平appid
 *   @param {String} params.url 下载地址，当走手Q下载SDK时使用
 *   @param {String} params.packageName 包名
 *   @param {String} params.actionCode 操作类型
 *   @param {String} params.via 用于上报罗盘
 *   @param {String} params.appName 应用名称，用于标题展示
 * @param {Function} callback 进度回调
 *   @param {Object} callback.object 回调数据
 *     @param {String} callback.object.appid 唯一标示，应用中心使用开平appid
 *     @param {Number} callback.object.state 回调状态
 *     @param {String} callback.object.packagename 包名
 *     @param {Number} callback.object.pro 进度
 *     @param {Number} callback.object.ismyapp 0 下载sdk 有进度 1 应用宝 无进度
 *     @param {String} callback.object.errorMsg 错误内容
 *     @param {String} callback.object.errorCode 错误代码
 * @note 请求参数
 */

mqq.build('mqq.app.downloadApp', {
    android: (function() {

        // 注册下载进度回调
        // `callsLen`主要为了提高检查`calls`为空的性能
        var calls = {}, callsLen = 0, isRegister;
        // 回调分发器，通过匹配队列中的`appid`与监听器返回的`appid`
        var cmcaller = function (dat) {
            if ( callsLen > 0 ) {
                var i = 0, len = dat.length, item, fn;
                if ( typeof dat === "object" && len ) {
                    for ( ; i < len, item = dat[i]; i++ ) {
                        if ( fn = calls[item.appid] ) fn(item);
                    }
                } else if ( fn = calls[dat.appid] ) {
                    fn(dat);
                }
            }
        }

        return function (params, callback) {

            if ( !isRegister ) {
                isRegister = true;
                // 注册全局的监听
                mqq.invoke('q_download', 'registerDownloadCallBackListener', mqq.callback(cmcaller));
            }

            // 回调队列
            if ( callback && typeof callback === "function" ) {
                callsLen++;
                calls[params.appid] = callback
            }

            mqq.invoke('q_download', 'doDownloadAction', params);
        }
    }()),
    support: {
        android: '4.5'
    }
});