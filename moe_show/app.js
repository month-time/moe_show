'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Scheduled Tasks modules
var schedule = require("node-schedule");
var scheduled_tasks = require('./public/javascripts/Scheduled_Tasks');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

//创建socket服务
var io = require('socket.io')(server);
//监听客户端连接事件
io.on('connection', function(socket){
  socket.broadcast.emit("login",{id:'1000',name:"System",message:socket.id+'登录了'});
//  客户端断开连接事件
  socket.on('disconnect', function(){
      console.log(socket.id+"连接断开");
      io.emit('disconnect',{id:'1000',name:"System", message:socket.id+"连接断开"});
//      io.emit('chat message', io.sockets.clients());
  });
//    获取用户聊天消息信息
  socket.on('chat message', function(msg){
      io.emit('chat message', {id:msg.id,name:msg.name,message:msg.message});
  });

});

console.log("阿斯蒂芬");
scheduled_tasks.scheduled_tasks();
