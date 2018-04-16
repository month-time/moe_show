function api_bot(qwe, abc) {
    var request = require('request');
    var options = {
        url: "http://gchat.qpic.cn/gchatpic_new/542432155/730388567-2865636851-7A09B0F67291CA8B80E86F5D626464DE/0?vuin=760502499&term=2",
        headers: {
            "referer": "",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            'Content-type': 'content-type'
        },
        encoding: null
    }
    request.get(options, function (err, res, body) {
        if (err) throw err;
        var img64 = body.toString("base64");
        img64= "data:image/jpeg;base64," + img64;
        console.log(img64);        
    var opti = {
        url: "https://whatanime.ga/search",
        headers: {
            'Accept':'application/json',
            "origin": "https://whatanime.ga",
            "referer": "https://whatanime.ga",
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': '__cfduid=d8ee94fc4cee702d781889a854b6056971523691345; _ga=GA1.2.1836618852.1523691338; _gid=GA1.2.1116289481.1523849141',
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            'x-requested-with':' XMLHttpRequest'            
        },
        form: {
            data:img64,
            filter:"",
            trial:1,
        }
    }
    request.post(opti, function(err,response,body){ 
        console.log("data:"+body);
        console.log("err:"+err);
        console.log('statusCode:', response && response.statusCode);
        abc.send(body);
    });    
    });
}
module.exports.api_bot = api_bot;