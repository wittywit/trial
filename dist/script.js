window.onload = function() {

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);
	
	//random website array
	function runme() {
    var arr = ["http://www.bbc.co.uk/", "http://www.yahoo.com/", "http://www.stackoverflow.com/"];
    var value = arr[Math.floor(Math.random() * arr.length)];
    window.open(value);
    // window.location = value;     // remove the comment at the beginning to actually navigate
	}

	
    //shake event callback
    function shakeEventDidOccur () {

        //put your own code here etc.
        alert('Shake!');
		runme();
    }
};


