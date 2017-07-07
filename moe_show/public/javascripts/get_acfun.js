//获取acfun文章区今日热点
function get_acfun(qwe, abc) {
    var request = require('request');
    var types = {
        '综合': "list110",
        '工作情感': "list73",
        '动漫文化': "list74",
        '漫画小说': "list75",
        '游戏':"list164"
    }
    var pageUrl = 'http://www.acfun.cn/v/' + types.综合 + '/index.htm';
    request.get(pageUrl, function (err, res, body) {
        var acfun = { article: [] };
        var jsdom = require("jsdom");
        var { JSDOM } = jsdom;
        var dom = new JSDOM(body);
        var rank_article = dom.window.document.querySelector('#block-rank-article').getElementsByClassName('item');
        for (var i = 0; i < rank_article.length; i++){
            var article = { article_title: '', article_url: ''};
            article.article_title = rank_article[i].querySelector('a').innerHTML;
            article.article_url = 'http://www.acfun.cn' + rank_article[i].querySelector('a').getAttribute('href'); 
            acfun.article.push(article);
        }
        console.log(acfun);
        abc.jsonp(acfun); 
    });
}
module.exports.get_acfun = get_acfun;