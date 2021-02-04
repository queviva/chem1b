"use strict"

/*

In the specific game JS code, you need to have:

Constants:
  var TIMELIMIT

Global variables:
  var initialQuestions = [[first question, right answer, wrong answer, wrong answer, etc.]
                          [second question, etc.]]

Directions

Initializations:
  eventListners
  set up current questionsCurrent
  startGame

*/


// GLOBAL VARIABLES -------------------------------------------------------------------------
  

var correctAnswer; // this will be 0 if left, 1 if right;

var questions = [];
var questionsCompleted = [];
var questionsCurrent = [];

var questionOutput = document.getElementById("questionOutput");
var leftChoiceOutput = document.getElementById("leftChoiceOutput");
var rightChoiceOutput = document.getElementById("rightChoiceOutput");


// DISPLAY CARDS OBJECT -----------------------------------------------------------------------------


var gameCards = {
  questionCardFront: document.getElementsByClassName("questionCardFront"),
  questionCardBack: document.getElementsByClassName("questionCardBack"),
  choiceCardFront: document.getElementsByClassName("choiceCardFront"),
  choiceCardBack: document.getElementsByClassName("choiceCardBack"),
  questionCard: document.getElementById("questionCard"),
  leftChoiceCard: document.getElementById("leftChoiceCard"),
  rightChoiceCard: document.getElementById("rightChoiceCard"),
  
  setToBack: function() {   // set the cards as though they were flipped around
    TweenMax.set(this.questionCardFront, {rotationX:180});
    TweenMax.set(this.questionCardBack, {rotationX:0});
    TweenMax.set(this.choiceCardFront, {rotationY:-180});
    TweenMax.set(this.choiceCardBack, {rotationY:0});
  },
  
  setToFront: function() {
    TweenMax.set(this.questionCardBack, {rotationX:-180});
    TweenMax.set(this.questionCardFront, {rotationX:0});
    TweenMax.set(this.choiceCardBack, {rotationY:180});
    TweenMax.set(this.choiceCardFront, {rotationY:0});
  },
    
  flip: function(initialDelay) {
      // flip the element name cards
    TweenMax.to(this.questionCardBack, 2, {rotationX:-180, ease:Back.easeInOut, delay:initialDelay});
    TweenMax.to(this.questionCardFront, 2, {rotationX:0, ease:Back.easeInOut, delay:initialDelay});
      // flip the element symbol cards
    TweenMax.to(this.choiceCardBack, 2, {rotationY:180, ease:Back.easeInOut, delay:initialDelay});
    TweenMax.to(this.choiceCardFront, 2, {rotationY:0, ease:Back.easeInOut, delay:initialDelay});
  },
  
  reverseFlip: function(duration, initialDelay) {
    TweenMax.to(this.questionCardFront, duration, {rotationX:180, ease:Back.easeInOut, delay:initialDelay});
    TweenMax.to(this.questionCardBack, duration, {rotationX:0, ease:Back.easeInOut, delay:initialDelay});
    TweenMax.to(this.choiceCardFront, duration, {rotationY:-180, ease:Back.easeInOut, delay:initialDelay});
    TweenMax.to(this.choiceCardBack, duration, {rotationY:0, ease:Back.easeInOut, delay:initialDelay});
  },
  
  moveHome: function(duration, initialDelay) {
    TweenMax.to(this.leftChoiceCard, duration, {y:CCARDY, x:LCCARDX,
                                         ease:Power2.easeInOut, delay:initialDelay});
    TweenMax.to(this.rightChoiceCard, duration, {y:CCARDY, x:RCCARDX,
                                         ease:Power2.easeInOut, delay:initialDelay});
    TweenMax.to(this.questionCard, duration, {y:QCARDY, ease:Power2.easeInOut, delay:initialDelay});
  },
    
  moveOffStage: function(questionTop, answersTop, newLeftRight) {
    TweenMax.set(this.questionCard, {scale:0.1, y:questionTop});
    TweenMax.set(this.leftChoiceCard, {scale:0.1, y:answersTop, x:newLeftRight});
    TweenMax.set(this.rightChoiceCard, {scale:0.1, y:answersTop,
                 x:(672 - newLeftRight - CCARDWIDTH)});
  },
    
  questionCardBounce: function(newBottom, newTop, initialDelay) {
    TweenMax.to(this.questionCard, 0.45, {scale:0.6, y:newBottom, ease:Power2.easeIn, delay:initialDelay});
    TweenMax.to(this.questionCard, 0.45, {scale:1, y:newTop,
                ease:Back.easeOut, delay:(initialDelay + 0.45)});
  },
  
  answerCardsBounce: function (bounceTop, bounceLeftRight,
                               questionTop, answersTop, answersLeftRight, initialDelay) {
    TweenMax.to(this.leftChoiceCard, 0.2, {scale:0.6, y:bounceTop, x:bounceLeftRight,
                ease:Power0.easeNone, delay:initialDelay});
    TweenMax.to(this.rightChoiceCard, 0.2, {scale:0.6, y:bounceTop,
                x:(672 - bounceLeftRight - CCARDWIDTH),
                ease:Power0.easeNone, delay:initialDelay});
    TweenMax.to(this.leftChoiceCard, 0.65, {scale:1, y:answersTop,
                x:answersLeftRight, ease:Back.easeOut, delay:(initialDelay + 0.2)});
    TweenMax.to(this.rightChoiceCard, 0.65, {scale:1, y:answersTop,
                x:(672 - answersLeftRight - CCARDWIDTH),
                ease:Back.easeOut, delay:(initialDelay + 0.2)});
    TweenMax.to(this.questionCard, 0.5, {y:questionTop, ease:Back.easeOut,
                delay:(initialDelay + 0.2)});
  },
};



// INITIALIZE FUNCTIONS ---------------------------------------------------------------------


function resetGame () {
  gameController.newInput = false;
  questions = initialQuestions.slice(0);
  questionsCurrent.splice(0, questionsCurrent.length);
  questionsCompleted.splice(0, questionsCompleted.length);
  
  gameScore.reset();
    
    // set up the questionsCurrent variable, which holds the next 5 questions to be tested
  for (var i = 0; i < 5; i++) {
    chooseNewQuestion();
  }
  displayCurrentQuestion();
  
    // need to get things out of the way to allow mouse clicks, etc.
  TweenMax.set(document.getElementById("smileyFace"), {scale:0, opacity:0});
  TweenMax.set(document.getElementById("redX"), {scale:0, opacity:0});
  TweenMax.set(document.getElementById("smileySmall"), {scale:0, opacity:0});
  TweenMax.set(document.getElementById("redXSmall"), {scale:0, opacity:0});
  TweenMax.set(document.getElementById("centerBox"), {scale:0, opacity:0});
  
  gameCards.setToBack();
}


function startGame () {
  gameTimer.countDown(0.5, TIMELIMIT);
  gameScore.enterBackdrop(1.5);
  gameTimer.enterBackdrop(1.7);
  gameCards.flip(3.2);
  window.setTimeout(function() {initializeGameInput();
                                gameController.newInput = true;}, 4600);
  gameTimer.start(4.7);
  gameController.addGameControls(4.71);
}


// INPUT FUNCTIONS -------------------------------------------------------------------------


  // input via keyboard, mouse, or touch
  // the "touchstart" does nothing when mouse clicked, only when touched on a touch screen
  // the "mousedown" is activated by touch after 0.3 seconds (but no input is accepted for 0.47 s)
  // however, even with gameController.newInput, some touches fire twice, so I added
  // the stop propogation

function initializeGameInput() {
  window.addEventListener("keydown", keydownHandler, false);
  
  document.getElementById("leftChoiceCard").addEventListener("mousedown", leftAnswerChosen, false);
  document.getElementById("leftChoiceCard").addEventListener("touchstart", leftAnswerChosen, false);
  document.getElementById("rightChoiceCard").addEventListener("mousedown", rightAnswerChosen, false);
  document.getElementById("rightChoiceCard").addEventListener("touchstart", rightAnswerChosen, false);
}


function removeGameInput() {
  window.removeEventListener("keydown", keydownHandler, false);
  
  document.getElementById("leftChoiceCard").removeEventListener("mousedown", leftAnswerChosen, false);
  document.getElementById("leftChoiceCard").removeEventListener("touchstart", leftAnswerChosen, false);
  document.getElementById("rightChoiceCard").removeEventListener("mousedown", rightAnswerChosen, false);
  document.getElementById("rightChoiceCard").removeEventListener("touchstart", rightAnswerChosen, false);
}


function keydownHandler(event) {
  if (event.keyCode === 37) {leftAnswerChosen()}
  else if (event.keyCode === 39) {rightAnswerChosen()};
}


function leftAnswerChosen(event) {
  if (gameController.newInput === true) {
    gameController.newInput = false;
    if (correctAnswer === 0) {answeredCorrectly()}
    else {answeredIncorrectly()};
  }
  if(event){
      event.stopPropagation();
      event.preventDefault();
  }
}


function rightAnswerChosen(event) {
  if (gameController.newInput === true) {
    gameController.newInput = false;
    if (correctAnswer === 1) {answeredCorrectly()}
    else {answeredIncorrectly()}
  }
  if(event){
    event.stopPropagation();
    event.preventDefault();
  }
}


// FUNCTIONS FOR RANDOMIZING AND DISPLAYING NEW QUESTIONS -----------------------------------


function chooseNewQuestion() {
  var randomNumber = Math.floor(Math.random() * questions.length);
  questionsCurrent.push(questions[randomNumber]);
  questions.splice(randomNumber, 1);
}


function displayCurrentQuestion() {
      // this function updates the correctAnswer to 0 if left, 1 if right
  var randomWrongAnswer = 2 + (Math.floor(Math.random() * (questionsCurrent[0].length - 2)));
  
  questionOutput.innerHTML = questionsCurrent[0][0];
  correctAnswer = Math.round(Math.random());
  if (correctAnswer === 0) {
    leftChoiceOutput.innerHTML = questionsCurrent[0][1];
    rightChoiceOutput.innerHTML = questionsCurrent[0][randomWrongAnswer];
  }
  else {
    rightChoiceOutput.innerHTML = questionsCurrent[0][1];
    leftChoiceOutput.innerHTML = questionsCurrent[0][randomWrongAnswer];
  }
}
  
  
// FUNCTIONS THAT DEAL WITH THE USER'S RIGHT OR WRONG ANSWER -------------------------------


function answeredCorrectly () {
  questionsCompleted.push(questionsCurrent.shift());
  chooseNewQuestion();
  if (questions.length < 1) {
    questions = questionsCompleted.slice(0);
    questionsCompleted.splice(0, questionsCompleted.length);
  }
  gameScore.numberCorrect++;
  gameScore.update(initialQuestions.length);
  animateFeedback(document.getElementById("smileyFace"), true, correctDelay);
  window.setTimeout(displayQuestionAnimation, (1000 * correctDelay));
}


function answeredIncorrectly () {
  var randomNewPosition = (Math.random() * 2.3) + 0.45;
  if (randomNewPosition < 1.4) {questions.push(questionsCurrent[0]);}  // retest wrong answer TWICE
  randomNewPosition = Math.ceil(randomNewPosition);
  questionsCurrent.splice(  // take the missed question and move it to
    randomNewPosition,      // a random position after 1, 2, or 3 questions
    0,                      // 43% after 2, 33% after 3, 24% after 1
    questionsCurrent.shift());
  gameScore.numberIncorrect++;
  animateFeedback(document.getElementById("redX"), false, incorrectDelay);
  window.setTimeout(displayQuestionAnimation, (1000 * incorrectDelay));
}


function animateFeedback(feedback, gotItCorrect, waitTime) {
  if (gotItCorrect === false) {
    if (correctAnswer === 0) {feedback.style.left = RIGHTXLEFT;}
    else {feedback.style.left = LEFTXLEFT;}
  }
  TweenMax.to(feedback, 0, {scale:1});
  TweenMax.to(feedback, 0.2, {opacity:1});
  TweenMax.to(feedback, 0.2, {opacity:0, delay:(0.2 + waitTime)});
  TweenMax.to(feedback, 0, {scale:0, delay:(0.4 + waitTime)});
}


function displayQuestionAnimation() {
  TweenMax.to(questionOutput, .45, {opacity:0, ease:Sine.easeIn});
  TweenMax.to(leftChoiceOutput, .45, {opacity:0, ease:Sine.easeIn});
  TweenMax.to(rightChoiceOutput, .45, {opacity:0, ease:Sine.easeIn});
  window.setTimeout(displayCurrentQuestion, 452);
  
  TweenMax.to(questionOutput, 0.15, {opacity:1, delay:.455});
  TweenMax.to(leftChoiceOutput, 0.15, {opacity:1, delay:.455});
  TweenMax.to(rightChoiceOutput, 0.15, {opacity:1, delay:.455});
  window.setTimeout(function(){gameController.newInput = true;}, 470);  // allows for new user input
}


// FUNCTIONS FOR ENDING THE GAME -----------------------------------------------------------


function endGame() {
  gameController.newInput = false;
  removeGameInput();
  gameStage.turnOff(1);
  gameScore.exitBackdrop(1.5);
  gameTimer.exitBackdrop(1.7);
  gameController.removeGameControls(1.5);
  
  var endBonus = gameScore.accuracyBonus();
  document.getElementById("endScoreOutput").innerHTML = gameScore.score;
  document.getElementById("endAccuracyOutput").innerHTML = (gameScore.accuracyPercent().toString() + "%");
  document.getElementById("endSpeedOutput").innerHTML = gameScore.speed();
  document.getElementById("endBonusOutput").innerHTML = endBonus;
  document.getElementById("finalScoreOutput").innerHTML = (gameScore.score + endBonus);
  
  TweenMax.to(document.getElementById("endGameSlide"), 0.8, {y:-511, ease:Back.easeOut, delay:2.2});
  TweenMax.to(document.getElementById("scoreLine"), 0.5, {opacity:1, ease:Power0.easeNone, delay:3});
  TweenMax.to(document.getElementById("finalScore"), 0.5, {opacity:1, ease:Power0.easeNone, delay:3.4});
  TweenMax.to(document.getElementById("finalScoreOutput"), 0.5, {opacity:1, ease:Power0.easeNone, delay:3.8});
  
  document.getElementById("playAgainButton").addEventListener("click", gameController.playAgain, false);
  document.getElementById("playAgainButton").addEventListener("touchstart", gameController.playAgain, false);
}



