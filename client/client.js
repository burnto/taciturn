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
    var oldData = $(".frame img:first").attr('src');
    $(".frame img:first")
      .attr("src", evt.data)
      .removeClass("start")
    // $(".messages").html(evt.data);
    $(".log")
      .prepend(
        $("<div></div>")
          .addClass("loggedImage")
          .append($("<img/>").attr("src", oldData)));
    
  })
  taciturn.connect();
  
  $(window).resize(function() {
    var img = $(".frame img")
    var frameExtra = img.outerHeight() - img.innerHeight();
    $(".frame img")
      .css({maxHeight: $(this).height() - $("header").outerHeight() - frameExtra - 40})
  }).resize();
  
  // Set up drop
  $("body").droppable('Files',

    // Drag enter
    function(e) {
      $(".frame").addClass('dragover')
    },

    // Drag leave
    function() {
      $(".frame").removeClass('dragover')
    },

    // Drop!
    function(e) {
      $(".frame").removeClass('dragover')

      var reader = new FileReader();
      reader.onload = function(e) { 
        // console.log(e.target.result);
        taciturn.send(e.target.result);
      }
      reader.readAsDataURL(e.dataTransfer.files[0]);
        }
    )

})
