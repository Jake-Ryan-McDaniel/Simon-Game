var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence(){
    userClickedPattern = [];
    gamePattern = [];
    level++;
    $("h1").text("Level: " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").click(function(){
var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
        var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown( function(){
    if(!started){
        $("h1").text("Level: " + level);

        nextSequence();
        started = true;
    }

});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
        nextSequence();
    }, 1000);
    }

}else{
    console.log(gamePattern);
    console.log(userClickedPattern);
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $("h2").text("Your High Score: " + level);
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    startOver();
}
}

function startOver(){
   level = 0;
   gamePattern =[];
   started = false;
}