// {

"use strict"

CSSPlugin.defaultTransformPerspective = 750;

var TIMELIMIT = 120;

var QCARDWIDTH = 450;
var QCARDHEIGHT = 125;
var CCARDWIDTH = 310;
var CCARDHEIGHT = 135;

var QCARDX = Math.round(336 - (QCARDWIDTH / 2));
var QCARDY = 50;
var CCARDY = (350 - CCARDHEIGHT);
var LCCARDX = Math.round(170 - (CCARDWIDTH / 2));
var RCCARDX = Math.round(502 - (CCARDWIDTH / 2));

TweenMax.set(document.getElementById("questionCard"), {x:QCARDX, y:QCARDY});
TweenMax.set(document.getElementById("leftChoiceCard"), {x:LCCARDX, y:CCARDY});
TweenMax.set(document.getElementById("rightChoiceCard"), {x:RCCARDX, y:CCARDY});

var LEFTXLEFT = "83px";
var RIGHTXLEFT = "415px";
// }

// these variables can be later changed
// based on user preference and also performance
var correctDelay = 0.1;
var incorrectDelay = 0.7;


var initialQuestions = [
    
  // log rules {
  
  ['log(a &middot; b) =', // product rule
    'log(a) <b>+</b> log(b)',
    'log(a) <b>-</b> log(b)',
    'b &middot; log(a)',
    'ln(a/b)',
    'ln(b)/ln(a)'
  ],
  
  ['log(a/b) =', // quotient rule
    'log(a) <b>-</b> log(b)',
    'log(a) <b>+</b> log(b)',
    'a &middot; log(b)',
    'ln(a/b)',
    'log(a) / log(b)'
  ],
  
  ['log(a<sup>b</sup>) =', // power rule
    'b &middot; log(a)',
    'log(a)<sup>log(b)</sup>',
    'log(a)<sup>b</sup>',
    'ln(a) * ln(b)'
  ],

  ['log<sub style="font-size:8px">base</sub>(a) =', // base change rule
    'ln(a) / ln(<i style="font-size:18px">base</i>)',
    'b &middot; log(a)',
    'log(a) + log(x)',
    'log(a)<sup>b</sup>',
    'ln(a) * ln(b)'
  ],

  ['log<sub style="font-size:8px">base</sub>(<i style="font-size:18px">base</i><sup>a</sup>) =', // identity rule
    '<i>a</i>',
    '<i>base</i>',
    'log<sub>a</sub>(<i>base</i>)',
    'a &middot ln(<i>base</i>)'
  ],

  ['ln(<i>e</i><sup>x</sup>) =', // identity rule for natural log
    '<i>x</i>',
    'ln(e) &middot; ln(x)',
    'ln(e) / ln(x)',
    'ln(e) + ln(x)',
    'e<sup>x</sup>'
  ],
  
  ['if a = b<sup>x</sup> then x = ...', // alg with logs
    'log<sub>b</sub>(a)',
    'log<sub>a</sub>(b)',
    'a<sup>b</sup>',
    'a<sup>log(b)</sup>'
  ],

  ['if ln(x) = a then x = ...', // alg with logs
    'e<sup>a</sup>',
    'ln<sub>a</sub>(e)',
    'log<sub>e</sub>(1)',
    'e<sup>x</sup>'
  ],
  
  ['x<sup>0</sup> = ', // zero power rule
    '1',
    '0','zero',
    '<i>undefined</i>',
    'ln(0)'
  ],
  
  ['ln(1) = ', // log of one rule
    'zero',
    '1','e','log<sub>0</sub>(e)'
  ],
  
  ['ln(2) ~= ', // natural log of two is almost .7
    '0.693','0.069','&frac12;','e<sup>2</sup>'
  ],

  ['<i>ln(#)</i> means ...', // natural log definition
    [
        'the natural log',
        'log<sub>e</sub>(#)',
        'log<sub>e</sub>(#)'
    ][~~(Math.random()*3)],
    'lightning','log on','log<sub><i>n</i></sub>(#)'
  ],

  // }
  
  // half-lives {
  ['zero-order half-life Eq.',
    't<sub>&frac12;</sub> = [A]<sub>0</sub> / 2k',
    't<sub>&frac12;</sub> = ln(2) / k',
    't<sub>&frac12;</sub> = 1 / k[A]<sub>0</sub>',
    't<sub>&frac12;</sub> = &frac12 &middot k'
  ],
  
  ['first-order half-life Eq.',
    't<sub>&frac12;</sub> = ln(2) / k',
    't<sub>&frac12;</sub> = [A]<sub>0</sub> / 2k',
    't<sub>&frac12;</sub> = 1 / k[A]<sub>0</sub>',
    't<sub>&frac12;</sub> = &frac12 &middot k'
  ],
  
  ['second-order half-life Eq.',
    't<sub>&frac12;</sub> = 1 / k[A]<sub>0</sub>',
    't<sub>&frac12;</sub> = ln(2) / k',
    't<sub>&frac12;</sub> = [A]<sub>0</sub> / 2k',
    't<sub>&frac12;</sub> = &frac12 &middot k'
  ],
  
  // }
  
  // rate laws {
  [`
  <div style="
    font-size:10px;
    line-height:12px;
  ">
  <table style="width:100%;">
   <tr><td style="height:14px;"></td><td></td></tr>
   <tr><td>[A]</td><td>Initial Rate</td></tr>
   <tr><td>1.0 M</td><td>0.01 M/s</td></tr>
   <tr><td>2.0 M</td><td>0.02 M/s</td></tr>
   <tr><td>3.0 M</td><td>0.03 M/s</td></tr>
  </table>
  <br>
  <b style="font-size:18px;">
  rxn rate is <i>what</i> order with respect to [A] ?
  </b>
  </div>
  `,
  'first',
  'zero-ith',
  'second',
  'third'
  ],
  
  ['Rate Law = ...', // rate law for something
   'k[A]<sup>x</sup>[B]<sup>y</sup>',
   'k[A]<sup>a</sup>[B]<sup>b</sup>',
   'k[A]<sub>0</sub>',
   '1 / k[A]<sub>0</sub>'
  ],
  
  ['<span style="font-size:14px;">Order of rxn is EQUAL to the coefficients...</span>',
    `${ ['occasionally','rarely','not usually'][~~(Math.random() * 3)] }`,
    'true'
  ],
  // }
  
  // catalyst {
    ['a <i>catalyst</i> will ...',
        ['&uarr;Rate of rxn','&darr;Ea'][~~(Math.random()*2)],
        '&uarr;&Delta;H',
        '&darr;&Delta;E',
        '&uarr;&Delta;G',
        '&darr;K'
    ],
  // }
  
  // some constants {
      
  ["<i>mole ... = </i>",
  '6.022 x 10<sup>23</sup>',
  "6.002 x 10<sup>23</sup>",
  "6.202 x 10<sup>32</sup>",
  "6.626 x 10<sup>-34</sup> J*s",
  "2.9979 x 10<sup>8</sup>"
  ],
  
  ["<i>g... gravity = </i>",
  "9.806 m/s<sup>2</sup>",
  "9.608 m/s<sup>2</sup>",
  "9.806 m/s",
  "10.06 ms",
  "9.806 ms<sup>2</sup>"
  ],
  
  // last line has no coma
  ["ratmaster", "I am", "you are", "we are", "they be"]
  
  // }

];

// advanced rxn rate order question {
const choices = 'zero-ith first second third'.split(' ');
function makeRxnTableA () {
    
    let order = ~~(Math.random() * 4);
    let conc = (1 + Math.random() * 3);
    let rate = (Math.random() / 10);
    let inc  = [[2, 3],[.5, .25],[2,.5]][~~(Math.random()*3)];
    
    
    let ans = [`
  <div style="
    font-size:10px;
    line-height:12px;
  ">
  <table style="width:100%;text-align:center;">
   <tr><td style="height:14px;"></td><td></td></tr>
   <tr><td>[A]</td><td>Initial Rate &Delta;[A]</td></tr>
   <tr>
    <td>${(1 * conc).toFixed(2)} M</td>
    <td>${(rate * (Math.pow(1, order))).toFixed(3)} M/s</td>
   </tr>

   <tr>
    <td>${(inc[0] * conc).toFixed(2)} M</td>
    <td>${(rate * (Math.pow(inc[0], order))).toFixed(3)} M/s</td>
   </tr>

   <tr>
    <td>${(inc[1] * conc).toFixed(2)} M</td>
    <td>${(rate * (Math.pow(inc[1], order))).toFixed(3)} M/s</td>
   </tr>
  </table>
  <br>
  <b style="font-size:18px;">
  rxn rate is <i>what</i> order with respect to [A] ?
  </b>
  </div>
`];
    ans.push(choices[order]);
    for (let i = 0, j = choices.length; i < j; i++) {
        if (i !== order) {
            ans.push(choices[i]);
        }
    }

    initialQuestions.push(ans);
    return ans;//(0.000212).toExponential();
}
makeRxnTableA();
makeRxnTableA();
makeRxnTableA();

// }

// solving rxn rate table {
    
function solveRxnTable () {
    
    let ansA = [0,1,2];
    let ansB = [0,1,2];
    
    let orderA = ~~(Math.random() * 3);
    let orderB = ~~(Math.random() * 3);
    
    let incA = [2,3][~~(Math.random() * 2)];
    let incB = [2,3,4][~~(Math.random() * 3)];

    let rateC = (
        Math.random() * Math.pow(10, (-5 - ~~(Math.random() * 3)))
    );
    let rateA = rateC * Math.pow(incA, orderA);
    let rateB = rateA * Math.pow(incB, orderB);
    
    let ans = [`
  <style>td{ border: 1px solid black; }</style>
  <div style="
    font-size:10px;
    line-height:12px;
  ">
  <table style="margin:auto;width:90%;text-align:center;">
   <tr><td colspan="4" style="border:none;height:14px;"></tr>
   <tr><td colspan="4"><b>aA + bB &rarr; cC</b></td></tr>
   <tr>
    <td><i>Trial</i></td>
    <td>[A]</td>
    <td>[B]</td>
    <td>Rate &Delta;[C]</td></tr>
   </tr>
   <tr>
    <td>#1</td>
    <td>${ incA }</td>
    <td>1</td>
    <td>${ rateA.toExponential(2) }</td>
   </tr>
   <tr>
    <td>#2</td>
    <td>1</td>
    <td>1</td>
    <td>${ rateC.toExponential(2) }</td>
   </tr>
   <tr>
    <td>#3</td>
    <td>${ incA }</td>
    <td>${ incB }</td>
    <td>${ rateB.toExponential(2) }</td>
   </tr>
  </table>
  <br>
  <b style="font-size:18px;">
  R = k[A]<sup><i>?</i></sup>[B]<sup><i>?</i></sup>
  </b>
  </div>
`];
    
    // remove the correct orders from the possible answers
    ansA.splice(orderA,1);
    ansB.splice(orderB,1);
    
    // push the correct answer onto the ans array
    ans.push(
        'k[A]<sup>'+orderA+'</sup>[B]<sup>'+orderB+'</sup>'
    );

    
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            ans.push(
                'k[A]<sup>'+ansA[i]+'</sup>[B]<sup>'+ansB[j]+'</sup>'
            );
        }
    }

    initialQuestions.push(ans);
    //return ansA +' '+ansB;//(0.000212).toExponential();
}

solveRxnTable();
solveRxnTable();
solveRxnTable();
//document.body.innerHTML = (solveRxnTable());

// }

// {
var directions = {
  
  acceptNewInput: true,
  currentPage: 0,
  nextButton: document.getElementById("nextButton"),
  
  prepare: function() {
    gameCards.setToFront();
    gameCards.moveOffStage(-100, 411, 250);
    TweenMax.set(document.getElementsByClassName("cardDescriptionText"), {opacity:0});
  },
  
  show: function() {
    this.currentPage = 0;
    gameCards.questionCardBounce(316, 50, 0.9);
    TweenMax.to(document.getElementById("directionsPage0"), 0.9, {x:-513, ease:Back.easeOut, delay:1.6});
    gameController.buttonEnter(this.nextButton, 2.5);
    this.nextButton.addEventListener("click", directions.nextHandler, false);
  },
  
  nextHandler: function() {
    if (directions.acceptNewInput === true) {
      directions.acceptNewInput = false;
      window.setTimeout(function(){directions.acceptNewInput = true}, 3300);
      directions.currentPage++;
      switch(directions.currentPage) {
        case 1:
          directions.page1();
          break;
        case 2:
          directions.page2();
          break;
        case 3:
          directions.page3();
          break;
      };
    };
  },
  
  page1: function() {
    var arrowKeysPic = document.getElementById("arrowKeysPic");
    var arrowKeysPicLeft = document.getElementById("arrowKeysPicLeft");
    var arrowKeysPicRight = document.getElementById("arrowKeysPicRight");
    
    TweenMax.to(document.getElementById("directionsPage0"), 0.9, {x:0, ease:Back.easeIn});
    gameCards.answerCardsBounce(122, 200, 1, 254, 10, 1);
    TweenMax.to(document.getElementById("directionsPage1"), 0.9, {x:455, ease:Back.easeOut, delay:1.8});
    
    TweenMax.set([arrowKeysPic, arrowKeysPicLeft, arrowKeysPicRight], {left:485});
    TweenMax.to(arrowKeysPic, 0.4, {opacity:1, delay:2.8});
    TweenMax.to(arrowKeysPicLeft, 0.4, {opacity:1, repeat:1, yoyo:true, repeatDelay:0.4, delay:4});
    TweenMax.to(arrowKeysPicRight, 0.4, {opacity:1, repeat:1, yoyo:true, repeatDelay:0.4, delay:5.6});
    TweenMax.to(arrowKeysPicLeft, 0.4, {opacity:1, repeat:1, yoyo:true, repeatDelay:0.4, delay:8});
    TweenMax.to(arrowKeysPicRight, 0.4, {opacity:1, repeat:1, yoyo:true, repeatDelay:0.4, delay:9.6});
  },
  
  page2: function() {
    TweenMax.to(document.getElementById("arrowKeysPic"), 0.4, {opacity:0});
    TweenMax.to([document.getElementById("arrowKeysPic"),
                 document.getElementById("arrowKeysPicLeft"),
                 document.getElementById("arrowKeysPicRight")], 0, {opacity:0, left:673, delay:0.45});
    TweenMax.to(document.getElementById("directionsPage1"), 0.9, {x:0, ease:Back.easeIn});
    TweenMax.to(this.nextButton, 0.5, {opacity:0});
    TweenMax.to(this.nextButton, 0, {x:-27, y:0, delay:0.51});
    TweenMax.to(this.nextButton, 0, {opacity:1, delay:0.6});
    window.setTimeout(function() {directions.nextButton.innerHTML = "Play Game"}, 600);
    gameController.buttonEnter(this.nextButton, 4.1);
    
    TweenMax.to(document.getElementById("directionsPage2"), 0.9, {x:386, ease:Back.easeOut, delay:1.2});
    TweenMax.to(document.getElementById("smileySmall"), 0.5, {scale:1, opacity:1,
                                                              ease:Back.easeOut, delay:2.6});
    TweenMax.to(document.getElementById("redXSmall"), 0.5, {scale:1, opacity:1,
                                                            ease:Back.easeOut, delay:3.2});
  },
  
  page3: function() {
    TweenMax.to(document.getElementById("directionsPage2"), 0.9, {x:0, ease:Back.easeIn});
    TweenMax.to(document.getElementById("smileySmall"), 0.4, {scale:0, opacity:0});
    TweenMax.to(document.getElementById("redXSmall"), 0.4, {scale:0, opacity:0});
    
    gameController.buttonExit(this.nextButton, 0);
    this.nextButton.removeEventListener("click", directions.nextHandler, false);
    gameCards.reverseFlip(1.5, 0.5);
    gameCards.moveHome(1, 0.75);
    TweenMax.to(document.getElementsByClassName("cardDescriptionText"), 0.5, {opacity:1, delay:1.95});
    window.setTimeout(function() {
      resetGame();
      directions.nextButton.innerHTML = "Next";
      TweenMax.set(directions.nextButton, {x:0});
      startGame();
      }, 2000);
  }
  
}


gameController.initializeIntroInput();

// }

