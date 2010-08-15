// Set up websocket

var taciturn = function() {
  var ws;
  var rcvHandler;


  return {
    init: function(rcv) {
      rcvHandler = rcv;
    },
    
    connect: function() {
      if(("WebSocket" in window)) {
        ws = new WebSocket("ws://localhost:8125");

        ws.onmessage = function(evt) {
          rcvHandler(evt);
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
      }else{
        alert("This app requires websockets. Please use a browser that supports them!")
      }
    },

    send: function() {
      ws.send('oh hai');
    },
    
    close: function() {
      ws.close();
    }
  }
}();



$(function() {
  taciturn.init(function(evt) {
    console.log(evt);
    $(".messages").html(evt);
  })
  
  // Set up drop
  $(".drop").droppable('Files',

        // Drag enter
        function(e) {
            $(this).addClass('dragover')
        },

        // Drag leave
        function() {
            $(this).removeClass('dragover')
        },

        // Drop!
        function(e) {
          $(this).removeClass('dragover')
          $('ul', this).append('<li>' + e.dataTransfer.files[0].fileName + '</li>')
        }
    )

})