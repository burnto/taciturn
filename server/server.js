var sys = require("sys"),
    ws = require("./ws"),
    http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

//
// http
//

var app = require('express').createServer();

app.get('/', function(req, res){
  res.sendfile('../client/index.html');
});
app.get('/*', function(req, res){
  res.sendfile('../client/' + req.params[0]);
});

app.listen(3000);

//
// websocket
//

var connections = [];

ws.createServer(function (websocket) {
  var connectionIndex;

  websocket.addListener("connect", function (resource) { 

    connectionIndex = connections.length;
    connections.push(websocket);

    // emitted after handshake
    sys.debug("connect " + connectionIndex);

    // server closes connection after 10s, will also get "close" event
    // setTimeout(websocket.end, 10 * 1000); 
  }).addListener("data", function (data) { 

    // handle incoming data
    for(var i = 0; i < connections.length; i++) {
      connections[i].write(data);
    }

  }).addListener("close", function () { 
    // emitted when server or client closes connection

    connections.splice(connectionIndex, 1);
    sys.debug("closed " + connectionIndex + ".  " + connections.length + " still connected.");
  });
}).listen(8125);


sys.puts('sshhh');
