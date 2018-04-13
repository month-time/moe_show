var http     = require('http');
var schedule = require("node-schedule");
function scheduled_tasks(){
    console.log("斯芬克斯");
    schedule.scheduleJob('5 * * * * *', function(){
        test();
    });
}
var i=0;
function test(){
    var request = require('request');
    //数据解析地址
    var pageUrl = 'http://www.pixiv.net/ranking_area.php?type=detail&no=6';
    var pageUrl = 'http://avoid.ink:3000/get_pixiv';
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
        var json_str = JSON.stringify(body);
        console.log(json_str);
        //返回请求内容
//        abc.jsonp(pixiv);
    });
    i++;
    console.log("斯芬克斯"+i);
}
function mysql_query(){
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'www.moeccg.com',
  user            : 'moeccg.com',
  password        : '824657913',
  database        : 'qcbook',
});
pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query('SELECT * FROM `pixiv_list` LIMIT 0, 1000', function (error, results, fields) {
      console.log(results);
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) throw error;
    // Don't use the connection here, it has been returned to the pool.
  });
});
}

module.exports.scheduled_tasks = scheduled_tasks;
