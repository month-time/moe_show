//获取bilibili周榜
function get_bilibili_api(qwe, abc) {
    var request = require('request');
    var types = {
        '全站': 'all',
        '原创': 'origin',
        '新番': 'bangumi',
        '新人': 'rookie'
    }
    var pageUrl = 'http://www.bilibili.com/index/rank/' + types.全站 + '-1-0.json';
    var options = {
        url : 'http://www.bilibili.com/index/rank/all-1-0.json',
        headers: {
            "referer": "http://www.bilibili.net",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            'Content-type': 'text/html;charset=utf-8'
        }
    }
    request.get(options, function (err, res, body) {
        console.log(body);
        abc.header({
            'Content-Type': 'text/html;charset=utf-8'
        });
        abc.send(body);
    });
}
//获取bilibili新番列表
function get_anime_list(qwe, abc) {
    var request = require('request');
    var pageUrl = 'http://bangumi.bilibili.com/jsonp/timeline_v2_global.ver?callback=timeline&type=jsonp';
    var options = {
        url: 'http://bangumi.bilibili.com/jsonp/timeline_v2_global.ver?callback=timeline&type=jsonp',
        headers: {
            "referer": "http://www.bilibili.net",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            'Content-type': 'text/html;charset=utf-8'
        }
    }    
    request.get(options, function (err, res, body) { 
        var datas = body.replace('timeline(', '');
        var datas = datas.replace(');', '');
        var xinfan = JSON.parse(datas);
        var bili_list = { animes:[]};
        for (var i = 0; i < xinfan.result.length; i++) {
            var anime = { 'area': '', 'title': '', 'bgmcount': '', 'weekday': '', 'lastupdate': '', 'cover': '', 'square_cover': '' };
            anime.area = xinfan.result[i].area;
            anime.title = xinfan.result[i].title;
            anime.bgmcount = xinfan.result[i].bgmcount;
            anime.weekday = xinfan.result[i].weekday;
            anime.lastupdate = xinfan.result[i].lastupdate_at;
            anime.cover = xinfan.result[i].cover;
            anime.square_cover = xinfan.result[i].square_cover;
            bili_list.animes.push(anime);
        }
        abc.jsonp(bili_list);
    });
}
module.exports.get_anime_list = get_anime_list;
module.exports.get_bilibili_api = get_bilibili_api;