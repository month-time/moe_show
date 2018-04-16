function get_pixiv(qwe,abc) {
    var request = require('request');
    //数据解析地址
    var pageUrl = 'http://www.pixiv.net/ranking_area.php?type=detail&no=6';
    //信息临时存储区
    var pixiv = { works: [] };
    request.get(pageUrl, function (err, res, body) {
        //加载html解析模块
        var jsdom = require("jsdom");
        var { JSDOM } = jsdom;
        //将html_str解析成dom对象
        var dom = new JSDOM(body);
        var ranking = dom.window.document.getElementsByClassName("ranking-item");
        //对dom对象遍历
        for (var i = 0; i < ranking.length; i++) {
            var title = ranking[i].querySelector(".data").querySelector("h2").querySelector("a").innerHTML;
            var url = "https://www.pixiv.net/" + ranking[i].getElementsByClassName("data")[0].querySelector("a").getAttribute("href");
            var WorksID = ranking[i].querySelector(".data").querySelector("h2").querySelector("a").getAttribute("href");
            WorksID = WorksID.replace("member_illust.php?mode=medium&illust_id=","");
            var image = dom.window.document.getElementsByClassName("_thumbnail ui-scroll-view")[i].getAttribute("data-src");
            image = image.replace('https://i.pximg.net/c/150x150/','https://i.pximg.net/c/240x480/');
//            var author = dom.window.document.getElementsByClassName("icon-text")[i].innerHTML;
            var author = ranking[i].getElementsByClassName("user-name")[0].innerHTML;
            var datetime = ranking[i].getElementsByClassName("inline-list")[1].querySelector("dd");
            var work = {WorksID: "" , datetime: "", title: '', image: "", url: '', author: '' , };
            work.title = title; work.image = image; work.url = url; work.author = author;work.WorksID = WorksID;work.datetime = datetime;
            pixiv.works.push(work);
        }
        //转换成字符串
        //var json_str = JSON.stringify(pixiv);
        //console.log('数据以响应完毕');
        //返回请求内容
        abc.jsonp(pixiv);
    });
}
function get_piximg(qwe,abc) {
    var request = require('request');
//    var pageurl = "https://i.pximg.net/img-original/img/2017/06/10/00/05/42/63303214_p0.png";
    var options = {
        url: "https://i.pximg.net/img-original/img/2017/06/16/18/00/13/63410503_p0.jpg",
        headers: {
            "referer": "http://www.pixiv.net",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            'Content-type': 'content-type'
        },
        //不执行再编码
        encoding: null
    }
    if (qwe.query.img_url != undefined) {
        var get_url = qwe.query.img_url;
        options.url = get_url;
        //console.log(options.url);
    }
    request.get(options, function (err, res, body) {
        if (err) throw err;
        //console.log(res.statusCode);
        abc.send(body)
    });
}
module.exports.get_piximg = get_piximg;
module.exports.get_pixiv = get_pixiv;