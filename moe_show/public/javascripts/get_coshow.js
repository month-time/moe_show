function get_coshow(qwe, abc) {
    //加载请求模块
    var request = require('request');
    //数据源
    var pageUrl = 'http://www.wadmz.com/dmzinfo/';
    request.get(pageUrl, function (err, res, body) {
        //加载html解析模块
        var jsdom = require("jsdom");
        var { JSDOM } = jsdom;
        //将html_str解析成dom对象
        var dom = new JSDOM(body);
        var manzhan_container = dom.window.document.querySelector(".manzhan_container_left").getElementsByClassName('manzhan_container_left_1');
        var works = { manzhan_list:[]};
        for (var i = 0; i < manzhan_container.length; i++) {
            var manzhan_url = manzhan_container[i].querySelector("a").getAttribute("href");
            var manzhan_img = manzhan_container[i].querySelector(".prod_img_a").getAttribute("src");
            var manzhan_title = manzhan_container[i].querySelector(".manzhan_title").querySelector("a").innerHTML;
            manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[4].removeChild(manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[4].querySelector("img"));
            var manzhan_address = manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[4].innerHTML;
            var manzhan_address = trimRight(trimLeft(manzhan_address));
            manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[3].removeChild(manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[3].querySelector("img"));
            var manzhan_time = manzhan_container[i].querySelector(".manzhan_container_left_1_con").getElementsByTagName("span")[3].innerHTML;
            var manzhan_time = trimRight(trimLeft(manzhan_time));
            manzhan_container[i].querySelector(".manzhan_price").removeChild(manzhan_container[i].querySelector(".manzhan_price").querySelector("i"));
            var manzhan_presale = manzhan_container[i].querySelector(".manzhan_price").innerHTML;
            var manzhan_presale = trimRight(trimLeft(manzhan_presale));
            var manzhan_price = manzhan_container[i].querySelector(".manzhan_price_1").innerHTML;
            var manzhan = { url: '', img: "", title: '', address: '', time: '', presale: '', price: '' };
            manzhan.url = manzhan_url; manzhan.img = manzhan_img; manzhan.title = manzhan_title; manzhan.time = manzhan_time; manzhan.address = manzhan_address; manzhan.presale = "预售票价格:" + manzhan_presale; manzhan.price = manzhan_price;
            works.manzhan_list.push(manzhan);
        }
        abc.jsonp(works);
    });
}
//去除字符串中的空格
function trimLeft(s) {
    if (s == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}  
function trimRight(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}         
module.exports.get_coshow = get_coshow;