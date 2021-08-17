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


function runme() {
    var arr = ["https://wittywit.com/trial/shu/birdy/", "https://wittywit.com/trial/shu/ocean/"];
    var value = arr[Math.floor(Math.random() * arr.length)];
    window.open(value);
    // window.location = value;     // remove the comment at the beginning to actually navigate
}


add = function(){
  runme();
   // window.open("https://codepen.io/wittywit/full/wvdbooK");
 
}
