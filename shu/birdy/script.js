//Bird

function fly(){
  var bird = document.getElementById("bird");
  var x = 0;
  var y = 0;
  var id = setInterval(frame, 5);
  function frame() {
      
    x++;
    bird.style.left = x + "px";
    y += .1;
    bird.style.top = y + "px";
    if (x == 200){
      clearInterval(id)
    }

  }
}

fly()


// Shake


window.onload = function() {
    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });
    // start listening to device motion
    myShakeEvent.start();
    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);
    //shake event callback
    function shakeEventDidOccur () {
        //put your own code here etc.
      add();
        //alert('Shake!');
    }
    $('span').bind( "touchstart", function(e){add();} );


};

function play(){
  var audio = document.getElementById("audio");
  audio.play();
  
}

add = function(){
  
    audio.play();
 
}