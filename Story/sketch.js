//Shortcuts
const $ = function( id ) { return document.getElementById( id ); };
const random = function ( array ) { return array[Math.floor(Math.random()*array.length)]; };

//Elements for the story
let persos = ["Adventurous Billy", "Shy Mary", "Big Gorilla"];
let objets = ["Improvised Tent", "Eternal Campfire"];

//Story Class
class Story{
  setSub(){
    this.subject = random(persos);
    $('subject').innerHTML = this.subject;
    return this;
  }

  setGG(){
    this.goodguy = random(persos);
    $('goodguy').innerHTML = this.goodguy;
    return this;
  }

  setBG(){
    this.badguy = random(persos);
    $('badguy').innerHTML = this.badguy
    return this;
  }

  setFriend(){
    this.friend = random(objets);
    $('friend').innerHTML = this.friend;
    return this;
  }

  setSol(){
    this.solution = random(objets);
    $('solution').innerHTML = this.solution;
    return this;
  }
}

//Declaration nouvelle story
const story = new Story();

//Fonctions
function setup(){
	noCanvas();
  load();
}

function load(){
  story.setSub().setGG().setBG().setFriend().setSol();
}




//help chaining understanding: https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html
