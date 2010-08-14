// Set up websocket

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

$(function() {
  // Set up dropzone
  
  function cancel(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    return false;
  }
  
  var drop = $(".drop");
  drop.bind('dragover', function(evt) {
    cancel(evt);
  })
  drop.bind('dragenter', function(evt) {
    drop.find(".message").html("drop me here");
    cancel(evt);
  })
  drop.bind('dragend', function(evt) {
    console.log('leave');
    cancel(evt);
  })
  drop.bind('drop', function(evt) {
    this.innerHTML += '<p>' + evt.dataTransfer.getData('Text') + '</p>';
    cancel(evt);
  })

  // 
  // addEvent(drop, 'dragover', cancel);
  // addEvent(drop, 'dragenter', cancel);
  // 
  // addEvent(drop, 'drop', function (event) {
  //   // stops the browser from redirecting off to the text.
  //   if (event.preventDefault) {
  //     event.preventDefault();
  //   }
  // 
  //   this.innerHTML += '<p>' + event.dataTransfer.getData('Text') + '</p>';
  // 
  //   return false;
  // });



  // $(".drop").bind("drop", function(evt) {
  //   alert(evt);
  //   
  // }) 

})