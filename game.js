// //Variables
// var buttonColours = ["red","blue","green","yellow"];
// var gamePattern = [];
// var userChosenPattern = [];
// var level = 0;
//
//
// function nextSequence(){
//   //Incresing the Level
//   level++;
//   $("h1").text("Level " + level);
//
//   //Selecting a random colour using a random number and pushing it
//   var randomNumber = Math.floor(Math.random()*4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//
//   $("#" + randomChosenColour).on("click", function(){
//     $("." + randomChosenColour).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColour);
//   });
// };
//
// //Whenever a button is clicked plays the corresponding sound and animates the button
// $(".btn").click(function(event) {
//   nextSequence();
//   var userChosenColour = $(this).attr("id");
//   userChosenPattern.push(userChosenColour);
//   playSound($(this).attr("id"));
//   animatePress($(this).attr("id"));
// })
//
// //Plays the sound related to the corresponding button
// function playSound(name){
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }
//
// //Animates the button when pressed
// function animatePress(currentColour){
//   $("#" + currentColour).addClass("pressed");
//   myTimeout = setTimeout(function() {
//     $("#" + currentColour).removeClass("pressed");
//   }, 100);
// }
//
// $(document).keypress(function() {
//   if(level == 0 && ){
//     nextSequence();
//     $("h1").text("Level " + level);
//   }
// });
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var isGameOver = false;
var checkAnswerIndex = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function() {
   var userChosenColour = $(this).attr("id");
   userChosenPattern.push(userChosenColour);
   playSound($(this).attr("id"));
   animatePress(userChosenColour);
   checkAnswer(userChosenColour);
})

function animatePress(currentColour){
   $("#" + currentColour).addClass("pressed");
   myTimeout = setTimeout(function() {
     $("#" + currentColour).removeClass("pressed");
   }, 100);
}

$(document).keydown(function(event) {
   if(level == 0 && event.key == "a"){
     myTimeout = setTimeout(function() {
       nextSequence();
     }, 800);
     $("h1").text("Level " + level);
   }
   if(level != 0 && isGameOver){
     startOver();
   }
 });

function checkAnswer(userColour) {
  if(userColour == gamePattern[checkAnswerIndex] && !isGameOver){
    checkAnswerIndex++;
  }
  else{
    isGameOver = true;
  }
  if(checkAnswerIndex==gamePattern.length){
    checkAnswerIndex=0;
    myTimeout = setTimeout(function() {
      nextSequence();
    }, 800);
  }
  if(isGameOver){
    playSound("wrong");
    $("body").addClass("game-over");
    myTimeout = setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  isGameOver = false;
  myTimeout = setTimeout(function() {
    nextSequence();
  }, 800);
  $("h1").text("Level " + level);
}
