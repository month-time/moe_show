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
    var ranking_api = {
        '全站一日最热': 'http://api.bilibili.com/x/web-interface/ranking/index?&day=1',
        '全站三日最热': 'http://api.bilibili.com/x/web-interface/ranking/index?&day=3',
        '全站一周最热': 'http://api.bilibili.com/x/web-interface/ranking/index?&day=7',
        '全站动态即时':'http://api.bilibili.com/x/web-interface/dynamic/index?jsonp=jsonp'
    }
    var options = {
        url: 'http://api.bilibili.com/x/web-interface/ranking/index?jsonp=jsonp&day=1',
        headers: {
            "referer": "http://www.bilibili.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
            'Accept-Language': "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3"
        }
    };
    request.get(options, function (err, res, body) {
        var body_json = JSON.parse(body);
        console.log(body_json);
        abc.send(body_json);
    });
}
//获取bilibili新番列表
function get_anime_list(qwe, abc) {
    var request = require('request');
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
        var bili_list = { animes_0: [], animes_1: [], animes_2: [], animes_3: [], animes_4: [], animes_5: [], animes_6: []};
        for (var i = 0; i < xinfan.result.length; i++) {
            var anime = { 'area': '', 'title': '', 'season_id':'', 'bgmcount': '', 'weekday': '', 'lastupdate': '', 'cover': '', 'square_cover': '' };
            anime.area = xinfan.result[i].area;
            anime.title = xinfan.result[i].title;
            anime.season_id = xinfan.result[i].season_id;
            anime.bgmcount = xinfan.result[i].bgmcount;
            anime.weekday = xinfan.result[i].weekday;
            anime.lastupdate = xinfan.result[i].lastupdate_at;
            anime.cover = xinfan.result[i].cover;
            anime.square_cover = xinfan.result[i].square_cover;
            switch (anime.weekday) {
                case 0: bili_list.animes_0.push(anime); break;
                case 1: bili_list.animes_1.push(anime); break;
                case 2: bili_list.animes_2.push(anime); break;
                case 3: bili_list.animes_3.push(anime); break;
                case 4: bili_list.animes_4.push(anime); break;
                case 5: bili_list.animes_5.push(anime); break;
                case 6: bili_list.animes_6.push(anime); break;
                default: break;
            }
        }
        abc.jsonp(bili_list);
    });
}
module.exports.get_anime_list = get_anime_list;
module.exports.get_bilibili_api = get_bilibili_api;
