
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").on("click",function (){
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer((userClickedPattern.length)-1);
});

$(document).on("keypress",function(){

    if(!started) {
        nextSequence();
        started = true;
    }
});


function nextSequence(){

    userClickedPattern = [];

    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);

    console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    level += 1;

    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();

}


function playSound(name){
    switch(name){
        case "red":
            var red = new Audio("sounds/"+name+".mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/"+name+".mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/"+name+".mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/"+name+".mp3");
            yellow.play();
            break;
    }
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("success");
        if (userClickedPattern.length == gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        } 
    }
    else{
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}

function startOver(){

    level = 0;

    started = false;

    gamePattern = [];

    userClickedPattern = [];

}