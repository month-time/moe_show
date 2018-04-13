//获取acfun文章区今日热点
function get_acfun_api(qwe, abc) {
    var request = require('request');
    var types = {
        '全部':'63',
        '综合': "110",
        '工作情感': "73",
        '动漫文化': "74",
        '漫画小说': "75",
        '游戏':"164"
    }
    var pageUrl = 'http://www.acfun.cn/rank.aspx?channelId=' + types.全部 + '&range=1&count=30&ext=1';
    request.get(pageUrl, function (err, res, body) {
        abc.send(body);
    });
}
module.exports.get_acfun_api = get_acfun_api;
