var audio = document.getElementById("audio_1");
var audio2 = document.getElementById("audio_2");
audio2.pause();
audio.addEventListener("ended", function () {
 audio2.play();
  alert("Hello! I am an alert box!");
});