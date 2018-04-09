function login(qwe, abc) {
var get_name = qwe.query.name||"abcc";
var get_pwd = qwe.query.pwd||"9:;<=>?@A";
var get_reg_date = qwe.query.reg_date||"2018-04-08 16:42:18";

var async = require('async');
//console.time('series');
async.series({
    one: function(callback) {
        var sql="SELECT * FROM `user` where nickname='"+get_name+"' LIMIT 0, 1000;"
        mysql_query(sql,callback);    //callback('i am err','one');异常处理
    },
    two: function(callback) {
        var pwd=time_decrypt(get_pwd);
        callback(null, pwd);
    },
}, function(error, result) {
//    console.log('error: ' + error);
//    console.log('result: ' + JSON.stringify(result));
    var local_data=time_decrypt(result.one.password,result.one.reg_date);
    if(result.two==local_data){
//       console.log("login Right!");     
       abc.cookie("isLogin",1,{maxAge: 60 * 1000})
       abc.cookie("poi",result.one.id+"&P&"+get_reg_date,{maxAge: 60 * 1000});
       abc.send({
           staus:true,
           msg:"Login Right!",
       });
    }else{
//       console.log("Login Err!");
       abc.cookie("isLogin",0,{maxAge: 60 * 1000})
       abc.send({
           staus:false,
           msg:"Login Err!!",
           private_key:get_reg_date,
       });
    }
//    console.timeEnd('series');
});
}
module.exports.login = login;

function reg(qwe, abc) {
var get_name = qwe.query.name||"abcc";
var get_pwd = qwe.query.pwd||"9:;<=>?@A";
var get_reg_date = qwe.query.reg_date||"2018-04-08 16:42:18";
//console.time('waterfall');  
var async = require('async');
async.waterfall([
    function(callback) {
        var sql="SELECT * FROM `user` where nickname='"+get_name+"' LIMIT 0, 1000;"
        mysql_query(sql,callback);    //callback('i am err','one');异常处理
    },
    function(one_arg, callback) {
        if(one_arg&&one_arg.nickname==get_name){
           console.log("该账号已注册");
           abc.send("Registered Err!");
           return;
    }
        get_pwd=time_encrypt(get_pwd,get_reg_date);
        var sql="INSERT INTO `user` (`nickname`, `password`, `reg_date`) VALUES ('"+get_name+"', '"+get_pwd+"', '"+get_reg_date+"')";
        mysql_query(sql,callback);
    },
], function(error, result) {
    console.log('error: ' + error);
    console.log('result: ' + result);
//    console.timeEnd('waterfall');
});
}
module.exports.reg = reg;

function time_encrypt(str, timestamps) {
    var str = str;
    if(timestamps){var myDate = new Date(timestamps)}
    else{var myDate = new Date()}
    var day = myDate.getDay();
    var str_n = str.split('');
    for (var i = 0; i < str_n.length; i++) {        
        str_n[i] = parseInt(str_n[i].charCodeAt()) + day;
        str_n[i] = String.fromCharCode(str_n[i]);
    }
    str = str_n.join('');
    return str;
}

function time_decrypt(str,timestamps) {
    var str=str;
    if(timestamps){var myDate = new Date(timestamps)}
    else{var myDate = new Date()}
    var day = myDate.getDay();
    var str_n = str.split('');
    for (var i = 0; i < str_n.length; i++) {        
        str_n[i] = parseInt(str_n[i].charCodeAt()) - day;
        str_n[i] = String.fromCharCode(str_n[i]);
    }
    str = str_n.join('');
    return str;
}

function mysql_query(sql,callback) {
    var mysql = require('mysql');
    var sql_option = require('./config').sql_option;
    var pool = mysql.createPool(sql_option);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            connection.release();
            callback(null, results[0])
        });
    });
}