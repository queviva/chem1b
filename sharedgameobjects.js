"use strict"

// OBJECT TO CONTROL STARTING, PAUSING, AND DIRECTIONS ----------------------------------------


var gameController = {
  newInput: false, // this is false WHILE an answer is being processed to prevent the user from answering a question before it becomes visible
  paused: false,
  
  buttonEnter: function(buttonID, initialDelay) {
      TweenMax.to(buttonID, .3, {y:-47, ease:Back.easeOut, delay:initialDelay});
  },
  
  buttonExit: function(buttonID, initialDelay) {
    TweenMax.to(buttonID, .3, {y:0, ease:Back.easeIn, delay:initialDelay});
  },
  
  initializeIntroInput: function() {
    document.getElementById("directionsButton").addEventListener("click", gameController.introToDirections, false);
    document.getElementById("startGameButton").addEventListener("click", gameController.introToGame, false);
    document.getElementById("directionsButton").addEventListener("touchstart", gameController.introToDirections, false);
    document.getElementById("startGameButton").addEventListener("touchstart", gameController.introToGame, false);
  },
  
  removeIntroInput: function() {
    document.getElementById("directionsButton").removeEventListener("click", gameController.introToDirections, false);
    document.getElementById("startGameButton").removeEventListener("click", gameController.introToGame, false);
    document.getElementById("directionsButton").removeEventListener("touchstart", gameController.introToDirections, false);
    document.getElementById("startGameButton").removeEventListener("touchstart", gameController.introToGame, false);
  },
  
  introToDirections: function() {
    gameController.removeIntroInput();
    TweenMax.to(document.getElementById("introductionSlide"), 0.9, {y:511, ease:Back.easeIn});
    TweenMax.to(document.getElementById("introductionBackground"), 1.3, {opacity:0, ease:Power2.easeIn});
    TweenMax.to(document.getElementById("introductionBackground"), 0, {scale:0, delay:1.35});
    resetGame();
    gameStage.setSize(); 
    window.setTimeout(function() {
      directions.prepare();
      gameStage.turnOn(0);
      directions.show()
        }, 1400);
  },
  
  introToGame: function() {
    gameController.removeIntroInput();
    TweenMax.to(document.getElementById("introductionSlide"), 0.9, {y:511, ease:Back.easeIn});
    TweenMax.to(document.getElementById("introductionBackground"), 1.3, {opacity:0, ease:Power2.easeIn});
    TweenMax.set(document.getElementById("introductionBackground"), {scale:0, delay:1.35});
    resetGame();
    gameStage.setSize(); 
    window.setTimeout(function() {
        gameStage.turnOn(0);
        startGame();}, 1400);
  },
  
  addGameControls: function(initialDelay) {
    this.buttonEnter(document.getElementById("directionsButton2"), initialDelay);
    this.buttonEnter(document.getElementById("pauseButton"), (initialDelay + 0.2));
    this.buttonEnter(document.getElementById("restartButton"), (initialDelay + 0.4));
    document.getElementById("directionsButton2").addEventListener("click",
                                                                  gameController.gameToDirections, false);
    document.getElementById("pauseButton").addEventListener("click", gameController.pauseHandler, false);
    document.getElementById("restartButton").addEventListener("click", gameController.restartGame, false);
  },
  
  removeGameControls: function(initialDelay) {
    document.getElementById("directionsButton2").removeEventListener("click",
                                                                     gameController.gameToDirections, false);
    document.getElementById("pauseButton").removeEventListener("click", gameController.pauseHandler, false);
    document.getElementById("restartButton").removeEventListener("click", gameController.restartGame, false);
    this.buttonExit(document.getElementById("restartButton"), initialDelay);
    this.buttonExit(document.getElementById("pauseButton"), (initialDelay + 0.2));
    this.buttonExit(document.getElementById("directionsButton2"), (initialDelay + 0.4));
  },
  
  gameToDirections: function() {
    gameController.removeGameControls(.31);
    if (gameController.paused === true) {
      gameController.removePause();
      gameStage.fadeOn(0);
    }
    resetGame();
    removeGameInput();
    clearInterval(gameTimer.interval);
    gameScore.exitBackdrop(0);
    gameTimer.exitBackdrop(0.2);
    directions.prepare();
    directions.show();
  },
  
  pauseHandler: function() {
    if (gameController.paused === true) {
      gameController.removePause();
      gameStage.fadeOn(0);
      gameTimer.start(0);
      gameTimer.tick();
    }
    else {
      gameController.paused = true;
      clearInterval(gameTimer.interval);
      document.getElementById("pauseButton").innerHTML = "Play";
      TweenMax.set(document.getElementById("pauseButton"), {x:8});
      gameStage.fadeOff(0);
    }
  },
  
  removePause: function() {
      gameController.paused = false;
      document.getElementById("pauseButton").innerHTML = "Pause";
      TweenMax.set(document.getElementById("pauseButton"), {x:0});
  },
  
  restartGame: function() {
    if (gameController.paused === true) {
      gameController.removePause();
    }
    gameStage.turnOff(0);
    gameStage.turnOn(1.2);
    clearInterval(gameTimer.interval);
    gameScore.exitBackdrop(0);
    gameTimer.exitBackdrop(0.2);
    gameController.removeGameControls(0);
    window.setTimeout(resetGame, 500);
    window.setTimeout(startGame, 1500);
  },
  
  playAgain: function() {
    document.getElementById("playAgainButton").removeEventListener("click", gameController.playAgain, false);
    document.getElementById("playAgainButton").removeEventListener("touchstart", gameController.playAgain, false);
    TweenMax.to(document.getElementById("endGameSlide"), 0.9, {y:0, ease:Back.easeIn});
    TweenMax.set(document.getElementById("scoreLine"), {opacity:0, delay:1});
    TweenMax.set(document.getElementById("finalScore"), {opacity:0, delay:1});
    TweenMax.set(document.getElementById("finalScoreOutput"), {opacity:0, delay:1});
    window.setTimeout(resetGame, 1000);
    gameStage.turnOn(1.2);
    window.setTimeout(startGame, 1500);
  },

};



// TIMER OBJECT ------------------------------------------------------------------------------


var gameTimer = {
  
  time: 0, // the time left in seconds
  interval: undefined,
  centerBox: document.getElementById("centerBox"),
  
  enterBackdrop: function(initialDelay) {
    TweenMax.to(document.getElementById("timeBoard"), .3, {y:50, ease:Back.easeOut, delay:initialDelay});
  },
  
  exitBackdrop: function(initialDelay) {
    TweenMax.to(document.getElementById("timeBoard"), .3, {y:0, ease:Back.easeIn, delay:initialDelay});
  },
  
  updateDisplay: function() {
    var minutes = Math.floor(this.time / 60);
    var seconds = this.time % 60;
    var secondsString = seconds.toString();
    if (seconds < 10) {
      secondsString = "0" + secondsString;
    }
    document.getElementById("timeOutput").innerHTML = minutes.toString() + ":" + secondsString;
  },

  countDown: function(initialDelay, TimeLengthOfGame) {
    this.time = TimeLengthOfGame;
    this.updateDisplay();
    this.centerBox.style.fontSize = "33px";
    this.centerBox.style.color = "#77FF99";
    this.centerBox.innerHTML = "Get Ready!"
    TweenMax.to(this.centerBox, 0.4, {opacity:1, scale:1, repeat:1, yoyo:true, repeatDelay:0.2, 
                                      delay:initialDelay});
    window.setTimeout(function(){this.centerBox.innerHTML = "3";
                                 this.centerBox.style.fontSize = "68px";
                                },
                      (1000 + 1000 * initialDelay));
    TweenMax.to(this.centerBox, 0.4, {opacity:1, scale:1, repeat:1, yoyo:true, repeatDelay:0.2, 
                                      delay:(initialDelay + 1)});
    window.setTimeout(function(){this.centerBox.innerHTML = "2"}, (2000 + 1000 * initialDelay));
    TweenMax.to(this.centerBox, 0.4, {opacity:1, scale:1, repeat:1, yoyo:true, repeatDelay:0.2, 
                                      delay:(initialDelay + 2)});
    window.setTimeout(function(){this.centerBox.innerHTML = "1"}, (3000 + 1000 * initialDelay));
    TweenMax.to(this.centerBox, 0.4, {opacity:1, scale:1, repeat:1, yoyo:true, repeatDelay:0.2, 
                                      delay:(initialDelay + 3)});
  },
  
  start: function(initialDelay) {
    window.setTimeout(function(){
          gameTimer.interval = setInterval(function(){gameTimer.tick();}, 1000);
          gameTimer.updateDisplay();
        }, (1000 * initialDelay));
  },
  
  tick: function() {
    this.time--;
    if (this.time < 1) {
      this.stop();
    }
    else if (this.time === 5) {
      this.alertTime();
    }
    this.updateDisplay();
  },
  
  alertTime: function() {
    TweenMax.to(document.getElementById("stage"), 0.5, {opacity:0.8, repeat:1, yoyo:true});
    TweenMax.to(document.getElementById("timeLabel"), 0.33, 
                {opacity:0, repeat:15, yoyo:true, ease:SteppedEase.config(1)});
  },
  
  stop: function() {
    clearInterval(this.interval);
    this.time = 0;
    this.centerBox.style.fontSize = "34px";
    this.centerBox.style.color = "#FF998B";
    this.centerBox.innerHTML = "Time's Up!"
    TweenMax.to(this.centerBox, 0.4, {opacity:1, scale:1, repeat:1, yoyo:true, repeatDelay:0.2});
    endGame();
  }
    
};


// SCORE OBJECT ------------------------------------------------------------------------------------


var gameScore = {
  numberCorrect: 0,
  numberIncorrect: 0,
  score: 0,  
  
  enterBackdrop: function(initialDelay) {
    TweenMax.to(document.getElementById("scoreBoard"), .3, {y:50, ease:Back.easeOut, delay:initialDelay});
  },
  
  exitBackdrop: function(initialDelay) {
    TweenMax.to(document.getElementById("scoreBoard"), .3, {y:0, ease:Back.easeIn, delay:initialDelay});
  },
  
  reset: function() {
    this.numberCorrect = 0;
    this.numberIncorrect = 0;
    this.score = 0;
    document.getElementById("scoreOutput").innerHTML = "0";
  },
  
  update: function(superBonusMinimum) {
    var scoreOutput = document.getElementById("scoreOutput");
    var correctFraction = 6 * ((this.numberCorrect + 1) / (this.numberCorrect + this.numberIncorrect + 4));
    var bonus = 5 * Math.floor(Math.pow(correctFraction, 2) - 12.7);
    if (this.numberCorrect > (superBonusMinimum + (2 * this.numberIncorrect))) {
      bonus = (2 * bonus) - 5;
    };
    this.score += 5;
    if (bonus > 0) {
      this.score += bonus;
    };
    TweenMax.to(scoreOutput, .19, {y:25});
    window.setTimeout(function(){scoreOutput.innerHTML = gameScore.score;}, 190);
    TweenMax.to(scoreOutput, .0, {y:-25, delay:0.19});
    TweenMax.to(scoreOutput, .19, {y:0, delay:0.19});
  },
  
  accuracyPercent: function() {
    if (this.numberCorrect === 0) {
      return 0;
    }
    else {
      return Math.round(100 * (this.numberCorrect / (this.numberCorrect + this.numberIncorrect)));
    }    
  },
  
  accuracyBonus: function() {
    if ((this.numberCorrect + this.numberIncorrect) < 10) {
      return 0;
    }
    else {
      var accP = this.accuracyPercent();
      if (accP === 100) {
        return 1000;
      }
      else if (accP >= 95) {
        return 750;
      }
      else if (accP >= 90) {
        return 500;
      }
      else if (accP >= 85) {
        return 300;
      }
      else if (accP >= 80) {
        return 200;
      }
      else if (accP >= 75) {
        return 100;
      }
      else {
        return 0;
      };
    };
  },
  
  speed: function() {
    var s = Math.round((this.numberCorrect + this.numberIncorrect) / (TIMELIMIT / 60));
    return (s.toString() + " qpm");
  }
};


// STAGE OBJECT -------------------------------------------------------------------------------


var gameStage = {
  stage: document.getElementById("stage"),
  whiteGlare: document.getElementsByClassName("whiteGlare"),
  
  setSize: function() {
    TweenMax.set(this.whiteGlare, {opacity:1});
    TweenMax.set(this.stage, {clip:"rect(204px, 339px, 208px, 335px)"}); 
  },
  
  
  turnOn: function(initialDelay) {
    TweenMax.to(this.stage, 0, {opacity:1, delay:initialDelay});
    
    
    TweenMax.to(this.stage, .23, {clip:"rect(205px, 674px, 208px, 0px)",
                                  delay:initialDelay});
    TweenMax.to(this.stage, .21, {clip:"rect(0px, 674px, 412px, 0px)",
                                  delay:(initialDelay + 0.2)});
    TweenMax.to(this.whiteGlare, .5, {opacity:0, delay:(initialDelay + 0.35)});
    TweenMax.to(this.whiteGlare, 0, {scale:0, delay:(initialDelay + 0.86)});
  },

  
  turnOff: function(initialDelay) {
    TweenMax.to(this.whiteGlare, 0, {scale:1, delay:initialDelay});
    TweenMax.to(this.whiteGlare, .19, {opacity:1, delay:initialDelay});
    TweenMax.to(this.stage, .2, {clip:"rect(205px, 674px, 208px, 0px)",
                                  delay:initialDelay});
    TweenMax.to(this.stage, .2, {clip:"rect(205px, 339px, 208px, 336px)",
                                delay:(initialDelay + 0.2)});
    TweenMax.to(this.stage, .05, {clip:"rect(191px, 339px, 221px, 336px)",
                                  delay: (initialDelay + 0.4)});
    TweenMax.to(this.stage, .05, {clip:"rect(206px, 339px, 206px, 336px)",
                                delay:(initialDelay + 0.45)});
    TweenMax.to(this.stage, 0, {opacity:0, delay: (initialDelay + 0.51)});
  },
  
  
  fadeOff: function(initialDelay) {
    TweenMax.set(this.whiteGlare, {scale:1});
    TweenMax.to(this.whiteGlare, 0.4, {opacity:1, delay:initialDelay});
    TweenMax.to(this.stage, 0.4, {opacity:0.5, delay:initialDelay});
  },
  
  fadeOn: function(initialDelay) {
    TweenMax.to(this.stage, 0.15, {opacity:1, delay:initialDelay});
    TweenMax.to(this.whiteGlare, 0.15, {opacity:0, delay:initialDelay});
    TweenMax.to(this.whiteGlare, 0, {scale:0, delay:(initialDelay + 0.16)});
  }
  
};






