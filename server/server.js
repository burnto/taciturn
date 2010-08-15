var sys = require("sys"),
    ws = require("./ws"),
    http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

/*

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.sendHeader(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found");
      response.close();
      return;
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.sendHeader(500, {"Content-Type": "text/plain"});
        response.write(err + "n");
        response.close();
        return;
      }

      response.sendHeader(200);
      response.write(file, "binary");
      response.close();
    });
  });
}).listen(8124);

*/


var app = require('express').createServer();

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3000);




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
