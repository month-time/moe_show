'use strict';
var express = require('express');
var router = express.Router();
var get_coshow = require('../script/get_coshow');
var get_pixiv = require('../script/get_pixiv');
var get_acfun = require('../script/get_acfun');
var get_acfun_api = require('../script/get_acfun_api');
var get_bilibili_api = require('../script/get_bilibili_api');
var proxy = require('../script/proxy');
var api_bot = require('../script/api_bot');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: "月詩計's Api"});
});
//bilibili
router.get('/get_anime_list', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_bilibili_api.get_anime_list(req, res);
});
router.get('/get_bilibili_api', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_bilibili_api.get_bilibili_api(req, res);
});
//coshow
router.get('/get_coshow', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_coshow.get_coshow(req, res);
});
router.get('/get_coshow_img', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_coshow.get_coshow_img(req, res);
});
//acfun
router.get('/get_acfun', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_acfun.get_acfun(req, res);
});
router.get('/get_acfun_api', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_acfun_api.get_acfun_api(req, res);
});
//pixiv
router.get('/get_pixiv', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_pixiv.get_pixiv(req, res);
});
router.get('/get_piximg', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    get_pixiv.get_piximg(req, res);
});

//tucao.tv videoUrl代理
//router.get('/proxy', function (req, res) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
//    proxy.proxy(req, res);
//});

var login = require('../script//login');
router.get('/login', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
    login.login(req, res);
});

router.get('/reg', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
    login.reg(req, res);
});

router.get('/api_bot', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
    api_bot.api_bot(req, res);
});

module.exports = router;


