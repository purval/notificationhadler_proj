
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var noti = require('./routes/notification');
var message = require('./routes/messages');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  console.log(app.get('port'));
}

app.get('/', routes.index);
app.get('/message', routes.messages);
app.get('/users', user.list);
app.post('/message',message.insertmessage);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
console.log(app.get('port'));
var io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log("user connected");
  socket.on('get_notifications', function(data){
	  noti.notifications(data, function(err, reply){
		  if(!err){
			  socket.emit('notifications', reply);
		  } 
	  });
  });
  socket.on('disconnect', function(){
	  console.log("connection closed");
  });
});
