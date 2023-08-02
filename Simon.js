var level=0  //storing level

var buttonColors=["blue","green","red","yellow"];   //storing id

var gamePattern=[];   //pattern generated


var userClickedPattern=[];    //pattern that user clicks

var started=false  //to keep tract of initialization

//starting the nextSequence()
$(document).keypress(function()
{
    if(!started)
    {
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
    }
})

//function for playing sounds
function playsound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


//for the events that user clicks
$(".btn").click(
    function()
    {
        var userChosenColor=$(this).attr("id");//accesing that id
        userClickedPattern.push(userChosenColor);
       playsound(userChosenColor);
       animatePress(userChosenColor);
       checkAnswer((userClickedPattern.length)-1);
    }
);


//The sequence that system generates
function nextSequence()
{
    level++
    $("#level-title").text("level "+level)

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColor);//calling playsound

    
}

function animatePress(CurrentColor)
{
    $("#"+CurrentColor).addClass("pressed");
    setTimeout(
        function()
        {
            $("#"+CurrentColor).removeClass("pressed");
        }
        ,10
    );
}

//to check whether user is going correct
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(nextSequence(),1000);
            
        }
    }
    else
        {
            var audio1=new Audio("./sounds/wrong.mp3");
            audio1.play();
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(
                function () {
                    $("body").removeClass("game-over");
                    }
                ,200
            )
            startOver();
        }
}

//to restart the game
function startOver()
{
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    
}
