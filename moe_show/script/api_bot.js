function api_bot(qwe, abc) {
    if(qwe.query.get_msg == undefined){
        var aa=`<?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
<msg serviceID="2" templateID="1" action="web" brief="来自月時计's blog 的问候" sourceMsgId="0" url="https://blog.voide.cc" flag="0" adverSign="0" multiMsgFlag="0">
    <item layout="2"><picture cover="http://avoid.ink/poi/link.png" alt=""/>
        <title>咸狼，你在说什么@_@</title>
        <summary>小月月不知道你说的是啥，请使用⑨也能看懂的句子</summary>
    </item>
    <source name="月時計's blog" icon="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=13fc4927c7bf6c81f7372bee8405d608/a1ec08fa513d2697d690a5125efbb2fb4316d83a.jpg" url="https://blog.voide.cc" action="app" a_actionData="com.zhihu.com" i_actionData="steam://install/453480" appid="453480" />
</msg>`;
    console.log(qwe.query.sh_poi)
        if(qwe.query.pic){
           sh_pixiv(qwe.query.pic)
        }
       abc.send(aa);
        return;
//      abc.send("你骄傲的和别人说，嘿，我写了个能让Windows崩溃的程序，他们会面无表情地盯着你说“哥们，我装系统的时候就免费带着了”");
    }
    sh_pixiv(qwe, abc);
    
   abc.send("你骄傲的和别人说，嘿，我写了个能让Windows崩溃的程序，他们会面无表情地盯着你说“哥们，我装系统的时候就免费带着了”");    
    return;
}

function sh_pixiv(pic){
    var request = require('request');
    var options = {
        url: pic,
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
        
        //    var options = {
        //        url: 'https://whatanime.ga',
        //    }; 
        
    });
//    var options = {
//        url: 'https://whatanime.ga',
//    };
}
module.exports.api_bot = api_bot;