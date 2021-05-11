var buttonColors = ["red","blue","green","yellow","brown","purple"];
var gamePattern = [];
var userClickedpattern = [];
var level = 0;
var started = false;

$("body").keypress( function() {
  if(!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedpattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedpattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedpattern.length-1);
});

function checkAnswer(currentLevel) {
  if(userClickedpattern.length !== gamePattern.length) {
    return;
  }
  if(userClickedpattern[currentLevel]===gamePattern[currentLevel]) {
    console.log(userClickedpattern);
  } else {
    var audio1 = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout( function () {$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press a key to restart");
    startOver();
  }
  if(userClickedpattern.length === gamePattern.length) {
      $("#score").slideUp().slideDown().text(level);
      setTimeout( function() { nextSequence() }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout( function () { $("#"+currentColor).removeClass("pressed") }, 100);
}
