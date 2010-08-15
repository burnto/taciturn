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
        ws = new WebSocket("ws://burnto.local:8125");

        ws.onmessage = function(evt) {
          rcvHandler(evt);
          console.log(evt);
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

    send: function(data) {
      ws.send(data);
    },
    
    close: function() {
      ws.close();
    }
  }
}();



$(function() {
  
  taciturn.init(function(evt) {
    console.log(evt);
    $("img").attr("src", evt.data)
    // $(".messages").html(evt.data);
  })
  taciturn.connect();
  
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

          var reader = new FileReader();
          reader.onload = function(e) { 
            // console.log(e.target.result);
            taciturn.send(e.target.result);
          }
          reader.readAsDataURL(e.dataTransfer.files[0]);
          
          
          // console.log(e.dataTransfer.files[0].getData("image/png"));
          // debugger;
          
          // taciturn.send(e.dataTransfer.files[0].fileName);
          // $('ul', this).append('<li>' + e.dataTransfer.files[0].fileName + '</li>')
        }
    )

})