/**
 * @fileOverview 贴吧扩展
 * @author  Xiaobin Li(516908542@qq.com)
 */

;(function () {

    /**
     * @const
     * @type {String}
     */
    var TIE_BA_NOTICE_URL = 'http://tieba.baidu.com/f/search/ures?ie=utf-8&kw=&qw=&rn=10&un=%E8%B4%B4%E5%90%A7%E5%90%A7%E4%B8%BB%E5%B0%8F%E7%AE%A1%E5%AE%B6&sm=1';

    /**
     * 首屏是否展示消息提醒
     * @const
     */
    var IS_SHOW_NOTICE_FIRST_SCREEN  = 0;

    /**
     * 1000毫秒刷新一次
     * @const
     * @type {number}
     */
    var FREQUENCY = 1000;

    // 所有吧集合
    var bas = [];


    if (window.location.href != TIE_BA_NOTICE_URL) {
        return;
    }

    /**
     * request ba公告栏
     */
    function requestTieBaNotice() {
        $.ajax({
            url: '',
            method: 'GET',
            success: function (res) {
                var res = $.trim(res);
                storeResult(res.match(/<font class=\"p_violet\">.*?<\/font>/gm));
                setTimeout(requestTieBaNotice, FREQUENCY);
            }
        }); 
    }

    /**
     * 去除吧名格式
     * @param {string} str 
     */
    function formatBar(str) {
        return str.replace(/<font.*>(.*?)<\/font>/, '$1');
    }

    /**
     * 存储吧
     * @param {Array<string>} res 
     */
    function storeResult(res) {
        if (!res) {
            return;
        }
        var isFirst = !bas.length;
        $.each(res, function(index, item) {
            var ba = formatBar(item);
            if (bas.indexOf(ba) == -1 && ba != '贴吧吧主小管家') {
                if (!isFirst || (isFirst && IS_SHOW_NOTICE_FIRST_SCREEN)) {
                    messageNotify.show(ba);
                }
                bas.push(ba);
            }
        });
    }

    /**
     * 通知一下
     */
    var messageNotify = {
        show: function(ba) {
            if (Notification.Permission !== 'granted') {
                Notification.requestPermission();
            }
            var config = {　　
                body: ba + '吧退出来了，请点击申请（' + ba + '）吧',
                icon: 'http://sucimg.itc.cn/sblog/j8ddc907de7404873898bf2c7459478df_c190',
                dir: 'auto',
                tag: ba
            };　　
            var notification = new Notification('新吧提醒', config);　　
            // setTimeout(function() {　　
            //     notification.close();　　
            // }, 5000);
            notification.onclick = function() {
                window.open('http://tieba.baidu.com/f?kw=' + ba);
            };
        }
    };

    requestTieBaNotice();

    // $('#head, #pb_adbanner, #encourage_entry, .tbui_aside_float_bar, .firework_sender_wrap, .u_joinvip, #tb_nav, #com_userbar, #thread_theme_5').hide();
    // $('.card_banner, .top_activity').hide();
    // $("#encourage_entry").next().hide();
    // var extendWrapper = $('div');
    // $('body').insertBefore(extendWrapper, $('body'));

}());
