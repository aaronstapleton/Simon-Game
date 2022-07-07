var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var randomChosenColor;
var userClickedPattern = [];
var level = 0;

$(document).keydown(nextSequence);
$('.btn').click(buttonClicked);


// Callback Functions



function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);

    level++;
    $('h1').text('Level '+level);





    

}

function buttonClicked(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);

    checkAnswer(gamePattern.length);

}

function playSound(name){
    var audioElement = new Audio("sounds/"+name+".mp3");
    audioElement.play();
}

function animatePress(curentColor){
    $("#"+curentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+curentColor).removeClass("pressed");
    },100);
}

function checkAnswer(level){
    //for some reason I'm not entering this function when i call it above

    if(userClickedPattern.length==level){
        
        if (arraysAreIdentical(userClickedPattern,gamePattern)){
            console.log("success");
            userClickedPattern = [];
            setTimeout(nextSequence,1000);

        } else if (userClickedPattern.length>=level){
            console.log("wrong");
            console.log(gamePattern);
            endGame();
        }
    }

}

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true; 
}

function endGame(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
    },200);
    startOver();


    //reset game
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}