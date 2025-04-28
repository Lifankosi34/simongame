var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var canClick=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
        canClick=true;
    }
});

$(".btn").click(function(){
    if(!canClick) return;
    var userChosenColor=$(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);


});

function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
     
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);



}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        $("#level-title").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}
    
    function startOver(){
        level=0;
        gamePattern=[];
        started=false;
        canClick=false;
    }