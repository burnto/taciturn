if(("WebSocket" in window)) {
  var ws = new WebSocket("ws://localhost:8125");
  
  ws.onmessage = function(evt) {
    console.log('onmessage' + evt);
  };
  
  ws.onopen = function(evt) {
    ws.send('oh hai');
  };
  
  ws.onclose = function(evt) {
    console.log('onclose' + evt);
  };
  
  ws.onerror = function(evt) {
    console.log('onerror' + evt);
  }
  ws.close(); 
}else{
  alert("This app requires websockets. Please use a browser that supports them!")
}