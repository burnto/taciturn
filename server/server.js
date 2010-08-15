var sys = require("sys"),
    ws = require("./ws"),
    http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var app = require('express').createServer();


app.get('/', function(req, res){
  res.sendfile('../client/index.html');
});
app.get('/*', function(req, res){
  // sys.puts(req.params[0]);
  res.sendfile('../client/' + req.params[0]);
});

app.listen(3000);

var x = 0;

var connections = [];

ws.createServer(function (websocket) {

  websocket.addListener("connect", function (resource) { 

    connections.push(websocket);

    // emitted after handshake
    sys.debug("connect: " + resource);

    // server closes connection after 10s, will also get "close" event
    // setInterval(function() {
    //   websocket.write("hi" + (x += 1));
    // }, 1000)
      // setTimeout(websocket.end, 10 * 1000); 
  }).addListener("data", function (data) { 

    // handle incoming data
    sys.debug(data);
    for(var i = 0; i < connections.length; i++) {
      connections[i].write(data);
    }

  }).addListener("close", function () { 
    // emitted when server or client closes connection

    // TODO remove websocket from connnectiosn array

    sys.debug("close");
  });
}).listen(8125);


sys.puts('sshhh');
