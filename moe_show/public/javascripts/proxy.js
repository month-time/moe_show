var urllib  = require('url');
var request = require('request');
//var logger = require('../common/logger')
var _ = require('lodash')


var ALLOW_HOSTNAME = [
  'http://api.tucao.tv','http://www.tucao.tv','https://api.tucao.tv','https://www.tucao.tv'
];
exports.proxy = function (req, res, next) {
  if (ALLOW_HOSTNAME.indexOf(req.headers.origin) == -1) {
    return res.send('this is not allowed');
  }
    var requrl="http://api.tucao.tv/api/playurl?";
    for(datas in req.query){
        requrl+=datas+"="+req.query[datas]+"&";
    }
    request.get({
        url: requrl,
        headers: {
            'Accept':'*/*',
//            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,eo;q=0.8',
            'Connection': 'keep-alive',
            'Cookie': 'UM_distinctid=16218f812af469-07568fe5f74d81-3e3d5f01-1fa400-16218f812b05ed; TUCAO_COOKIE=c267AwIDUgZWUQBSCQUHAFYGBw8GU1oDDwoEAwZhZScjeQ',
            'Host': 'api.tucao.tv',
            'Referer': 'http://www.tucao.tv/play/h4075499/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
            'X-Requested-With': 'ShockwaveFlash/28.0.0.161',
        },
    }, function (error, response, body) {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        if (error) {
            console.log(error);
        }
    }).pipe(res);
};

function sad(){
  var url = decodeURIComponent(req.query.url);
  var hostname = urllib.parse(url).hostname;
    console.log(url);
    console.log(ALLOW_HOSTNAME.indexOf(hostname));
  if (ALLOW_HOSTNAME.indexOf(hostname) === -1) {
    return res.send(hostname + ' is not allowed');
  }
  if (ALLOW_HOSTNAME.indexOf(hostname) === 0) {
      req.header('host',hostname);
      console.log(req.headers);
     	request.get({
		url: url,
		headers: _.omit(req.headers, ['cookie', 'refer','origin',]),
	}, function (error, response, body) {
		console.log(response.statusCode);
		if (!error && response.statusCode == 200) {
            console.log(body);
                return res.send(body);
        }
		if(error){console.log(error);}
	});
  }
//	request.get({
//		url: url,
//		headers: _.omit(req.headers, ['cookie', 'refer','origin']),
//	}, function (error, response, body) {
//		console.log(response.statusCode);
//		if (!error && response.statusCode == 200) {
////            console.log(body);
//        }
//		if(error){console.log(error);}
//	}).pipe(res);
    
}