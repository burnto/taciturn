var sys = require("sys"),
    ws = require("./ws"),
    http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs");


/* http */

var app = require('express').createServer();

app.get('/', function(req, res){
  res.sendfile('../client/index.html');
});
app.get('/*', function(req, res){
  sys.puts(req.params[0]);
  res.sendfile('../client/' + req.params[0]);
});

app.listen(3000);



/* websocket */

ws.createServer(function (websocket) {
  websocket.addListener("connect", function (resource) { 
    // emitted after handshake
    sys.debug("connect: " + resource);

    // server closes connection after 10s, will also get "close" event
      setTimeout(websocket.end, 10 * 1000); 
    }).addListener("data", function (data) { 

    // handle incoming data
    sys.debug(data);

    // send data to client
    websocket.write("Thanks!");
  }).addListener("close", function () { 
    // emitted when server or client closes connection
    sys.debug("close");
  });
}).listen(8125);


sys.puts('sshhh');
