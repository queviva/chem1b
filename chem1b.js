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

TweenMax.set(document.getElementById("questionCard"), { x: QCARDX, y: QCARDY });
TweenMax.set(document.getElementById("leftChoiceCard"), { x: LCCARDX, y: CCARDY });
TweenMax.set(document.getElementById("rightChoiceCard"), { x: RCCARDX, y: CCARDY });

var LEFTXLEFT = "83px";
var RIGHTXLEFT = "415px";
// }

// these variables can be later changed
// based on user preference and also performance
var correctDelay = 0.1;
var incorrectDelay = 0.1;

(document.body.appendChild((document.createElement('style')))).innerText
    = `.ratSM {font-size:14px;line-height:16px;width:90%;}`;

var initialQuestions = [

    // gas law & R values {
    ['Ideal Gas Law is ...',
        'PV = <i>n</i>RT',
        '<i>u</i>R&alpha; = <i>PRVT</i>',
        'RT = <i>V</i>RT',
        'P/V = T'
    ],
        
    ['For P in Joules, R =',
        '8.314 Joules/molK',
        '8.314 atmL/molK',
        '0.08205 atmL/molK',
        '<span class="ratSM">R = 62.36 mmHgL/molK'
    ],
    
    ['For P in kPa, R =',
        '8.314 kPaL/mol',
        '8.314 atmL/molK',
        '0.08205 atmL/molK',
        '<span class="ratSM">R = 62.36 mmHgL/molK'
    ],
    
    ['For P in atm, R = ',
        '0.08205 atmL/molK',
        '8.314 kPaL/mol',
        '8.314 atmL/molK',
        '0.08502 atmL/molK',
        '<span class="ratSM">R = 62.36 mmHgL/molK'
    ],
    
    ['For P in Torr, R = ',
        '<span class="ratSM">R = 62.36 mmHgL/molK',
        '8.314 kPaL/mol',
        '8.314 atmL/molK',
        '0.08205 atmL/molK',
        '<span class="ratSM">R = 63.26 mmHgL/molK'
    ],

    //}

    // arrhenius equations {
    [
        'Arrhenius Equation',
        'k = A&middot;e<sup>-Ea/RT</sup>',
        'k = A&middot;e<sup>Ea/RT</sup>',
        'k = A&middot;e<sup>-RT/Ea</sup>',
        'k = ln(A)&middot;e<sup>-Ea/RT</sup>',
    ],
    
    [
        'Linear Arrhenius Eq.',
        '<span class="ratSM">ln(k) = (-Ea/R)&middot;(1/T) + ln(A)',
        'k = A&middot;e<sup>-RT/Ea</sup>',
        'ln(A) = e<sup>Ea/RT</sup'
    ],

    [
        '2Temp Arrhenius Eq.',
        '<span class="ratSM">ln(k<sub>2</sub>/k<sub>1</sub>) = -(Ea/R) &middot; (1/T<sub>2</sub>-1/T<sub>1</sub>)',
        '<span class="ratSM">ln(k<sub>1</sub>/k<sub>2</sub>) = -(Ea/R) &middot; (1/T<sub>1</sub>-1/T<sub>2</sub>)',
        '<span class="ratSM">ln(k<sub>2</sub>/k<sub>1</sub>) = -(Ea/R) &middot; (1/T<sub>2</sub>+1/T<sub>1</sub>)',
        '<span class="ratSM">ln(k<sub>2</sub>/k<sub>1</sub>) = +(Ea/R) &middot; (1/T<sub>2</sub>+1/T<sub>1</sub>)'
    ],
    //}

    // equilibrium {

    [
        `
<div class="ratSM"><br>
Reaction Quotient (Q<sub>c</sub>)<br>
at <i>some time</i> (t) from<br>
a[A] + b[B] &rlhar; c[C] + d[D]
</div>
   `, ['products/reactants',
            '[C]<sup>c</sup>[D]<sup>d</sup>/[A]<sup>a</sup>[B]<sup>b</sup>'
        ][~~(Math.random() * 2)],
        '[C]<sup>1</sup>[D]<sup>2</sup>/[A]<sup>3</sup>[B]<sup>4</sup>',
        '[A]<sup>a</sup>[B]<sup>b</sup>/[C]<sup>c</sup>[B]<sup>b</sup>',
    ],

    ['Q<sub><i>c</i></sub> = K<sub><i>eq</i></sub>',
        'at equilibrium',
        'for inert reactions',
        'for gasses',
        'for (aq) solutions',
        '&uarr;product conc.'
    ],

    //}

    // enthalpy {

    ['<i>enthalpy is...</i>',
        'the energy IN things',
        '[just learn for now]'
    ],

    ['in an EXOthermic reaction...',
        '&Delta;H is NEGATIVE',
        '[just learn for now]'
    ],

    // }
    
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
        'ln(a)/ln(b)',
        'log<sub>a</sub>(b)',
        'a<sup>x</sup>',
        'a &middot; ln(b)'
    ],

    ['if ln(x) = a then x = ...', // alg with logs
        'e<sup>a</sup>',
        'ln<sub>a</sub>(e)',
        'log<sub>e</sub>(1)',
        'e<sup>x</sup>'
    ],

    ['x<sup>0</sup> = ', // zero power rule
        '1',
        '0', 'zero',
        '<i>undefined</i>',
        'ln(0)'
    ],

    ['ln(1) = ', // log of one rule
        'zero',
        '1', 'e', 'log<sub>0</sub>(e)'
    ],

    ['ln(2) ~= ', // natural log of two is almost .7
        '0.693', '0.069', '&frac12;', 'e<sup>2</sup>'
    ],

    ['<i>ln(#)</i> means ...', // natural log definition
        [
            'the natural log',
            'log<sub>e</sub>(#)',
            'log<sub>e</sub>(#)'
        ][~~(Math.random() * 3)],
        'lightning', 'log on', 'log<sub><i>n</i></sub>(#)'
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

    // integrated rate laws {
    [`<div class="ratSM"><br>
  Integrated Rate Laws tell you<br>
  the Concentration at some time [A]<sub>t</sub><br>
  `,
        'true', 'false'
    ],
    

    [`<div class="ratSM"><br>
    Partial Pressures can be used<br>
    in the Integrated Rate Law
  `,
        'true', 'false'
    ],

    ['0<sup>th</sup>ord int. rate',
        '[A]<sub>t</sub> = -kt + [A]<sub>0</sub>',
        'ln[A]<sub>t</sub> = -kt + ln[A]<sub>0</sub>',
        '1/[A]<sub>t</sub> = kt + 1/[A]<sub>0</sub>',
        '1/[A]<sub>t</sub> = -kt + 1/[A]<sub>0</sub>',
        '[A]<sub>t</sub> = kt + [A]<sub>0</sub>'
    ],


    ['1<sup>st</sup>ord int. rate',
        'ln[A]<sub>t</sub> = -kt + ln[A]<sub>0</sub>',
        '[A]<sub>t</sub> = -kt + [A]<sub>0</sub>',
        '1/[A]<sub>t</sub> = kt + 1/[A]<sub>0</sub>',
        '1/[A]<sub>t</sub> = -kt + 1/[A]<sub>0</sub>',
        '[A]<sub>t</sub> = kt + [A]<sub>0</sub>'
    ],


    ['2<sup>nd</sup>ord int. rate',
        '1/[A]<sub>t</sub> = kt + 1/[A]<sub>0</sub>',
        '[A]<sub>t</sub> = -kt + [A]<sub>0</sub>',
        'ln[A]<sub>t</sub> = -kt + ln[A]<sub>0</sub>',
        '1/[A]<sub>t</sub> = -kt + 1/[A]<sub>0</sub>',
        '[A]<sub>t</sub> = kt + [A]<sub>0</sub>'
    ],

    // }
    
    // rate law tables {
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
        '&darr;Ea',
        '&uarr;&Delta;H',
        '&darr;&Delta;E',
        '&uarr;&Delta;G',
        '&darr;K'
    ],
    ['a <i>catalyst</i> will ...',
        '&uarr;Rate of rxn',
        '&uarr;&Delta;H',
        '&darr;&Delta;E',
        '&uarr;&Delta;G',
        '&darr;K'
    ],
    // }

    // some constants and conversions {
    ['relation between K<sub>p</sub> an K<sub>c</sub>',
        'K<sub>p</sub> = K<sub>c</sub>(RT)<sup>&Delta;n</sup>',
        'K<sub>c</sub> = K<sub>p</sub>(RT)<sup>&Delta;n</sup>',
        'K<sub>p</sub> = K<sub>c</sub><sup>&Delta;n</sup>',
        'K<sub>p</sub> = K<sub>n</sub>(&Delta;c)<sup>(RT)</sup>'
    ],

    ['from Kelvin to C<sup>&deg;</sup>...',
        '- 273<sup>&deg;</sup>',
        'x 237<sup>&deg;</sup>',
        '+ 723<sup>&deg;</sup>',
        '+ 273<sup>&deg;</sup>'
    ],

    ['from C<sup>&deg;</sup> to Kelvin...',
        '+ 273<sup>&deg;</sup>',
        '+ 237<sup>&deg;</sup>',
        '+ 723<sup>&deg;</sup>',
        '- 273<sup>&deg;</sup>'
    ],

    ['1 atm = ???',
        '760 Torr',
        '670 Torr',
        '1776 Torr',
        '706 Torr'
    ],

    ["<i>mole ... = </i>",
        '6.022 x 10<sup>23</sup>',
        "6.002 x 10<sup>23</sup>",
        "6.202 x 10<sup>32</sup>",
        "6.626 x 10<sup>-34</sup> J*s",
        "2.9979 x 10<sup>8</sup>"
    ],

    /*
    ["<i>g... gravity = </i>",
    "9.806 m/s<sup>2</sup>",
    "9.608 m/s<sup>2</sup>",
    "9.806 m/s",
    "10.06 ms",
    "9.806 ms<sup>2</sup>"
    ],
    */

    // last line has no coma
    ["ratmaster", "I am", "you are", "we are", "they be"]

    // }
    
];

/*
// exam1 review generators {

let examOneGen = () => {
    
    let
    R = 8.3145,
    initP = 23.8, //vapor pressure of water
    initT = (20 + Math.random() * 8).toFixed(0),
    ABvol = (180 + Math.random() * 60).toFixed(0),
    initV = ABvol,
    Konst = (Math.random() / 10).toFixed(4),
    ABMolo = Math.random().toFixed(1),
    finalV = (ABvol - 10 * Math.random()).toFixed(1),
    finalP = (500 + 500 * Math.random()).toFixed(1);
    
    let msg =`<div class="ratSM"><br>
    AB(aq) -> A(g) + B(g) @${ initT }<sup>&deg;</sup>C
    <br>
    ${ ABvol }ml of ${ ABMolo }M AB disolve over water<br>
    at what <i>time</i> will there be ${ finalV }ml of product<br>
    at a pressure of ${ finalP }mmHg?<br>
    <span style="font-size:8px">
    vapor pressure of H<sub>2</sub>O = 23.8 mmHg
    </span>
    `;
    
    // ok, PV = nRT, so number of moles is n = PV/RT
    //
    let n = (initP * initV) / (R * (initT + 273));
    
    let Q = [msg,'true','false'];
    
    //initialQuestions.push(Q);
};

    
//}
*/

// advanced rxn rate order question {
const choices = 'zero-ith first second third'.split(' ');

function makeRxnTableA() {

    let order = ~~(Math.random() * 4);
    let conc = (1 + Math.random() * 3);
    let rate = (Math.random() / 10);
    let inc = [
        [2, 3],
        [.5, .25],
        [2, .5]
    ][~~(Math.random() * 3)];


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
    return ans; //(0.000212).toExponential();
}

// }

// solving rxn rate table {

function solveRxnTable() {

    let ansA = [0, 1, 2];
    let ansB = [0, 1, 2];

    let orderA = ~~(Math.random() * 3);
    let orderB = ~~(Math.random() * 3);

    let incA = [2, 3][~~(Math.random() * 2)];
    let incB = [2, 3, 4][~~(Math.random() * 3)];

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

    // remove the correct orders from ONE of the possible answers
    if (Math.random() > 0.5) {
        ansA.splice(orderA, 1);
    }
    else {
        ansB.splice(orderB, 1);
    }

    // push the correct answer onto the ans array
    ans.push(
        'k[A]<sup>' + orderA + '</sup>[B]<sup>' + orderB + '</sup>'
    );


    for (let i = 0; i < ansA.length; i++) {
        for (let j = 0; j < ansB.length; j++) {
            ans.push(
                'k[A]<sup>' + ansA[i] + '</sup>[B]<sup>' + ansB[j] + '</sup>'
            );
        }
    }

    initialQuestions.push(ans);
    //return ansA +' '+ansB;//(0.000212).toExponential();
}

//document.body.innerHTML = (solveRxnTable());

// }

// adding tables to questions {
makeRxnTableA();
makeRxnTableA();
makeRxnTableA();
makeRxnTableA();
makeRxnTableA();
solveRxnTable();
solveRxnTable();
solveRxnTable();
solveRxnTable();
solveRxnTable();
solveRxnTable();
solveRxnTable();
//}

// {
var directions = {

    acceptNewInput: true,
    currentPage: 0,
    nextButton: document.getElementById("nextButton"),

    prepare: function() {
        gameCards.setToFront();
        gameCards.moveOffStage(-100, 411, 250);
        TweenMax.set(document.getElementsByClassName("cardDescriptionText"), { opacity: 0 });
    },

    show: function() {
        this.currentPage = 0;
        gameCards.questionCardBounce(316, 50, 0.9);
        TweenMax.to(document.getElementById("directionsPage0"), 0.9, { x: -513, ease: Back.easeOut, delay: 1.6 });
        gameController.buttonEnter(this.nextButton, 2.5);
        this.nextButton.addEventListener("click", directions.nextHandler, false);
    },

    nextHandler: function() {
        if (directions.acceptNewInput === true) {
            directions.acceptNewInput = false;
            window.setTimeout(function() { directions.acceptNewInput = true }, 3300);
            directions.currentPage++;
            switch (directions.currentPage) {
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

        TweenMax.to(document.getElementById("directionsPage0"), 0.9, { x: 0, ease: Back.easeIn });
        gameCards.answerCardsBounce(122, 200, 1, 254, 10, 1);
        TweenMax.to(document.getElementById("directionsPage1"), 0.9, { x: 455, ease: Back.easeOut, delay: 1.8 });

        TweenMax.set([arrowKeysPic, arrowKeysPicLeft, arrowKeysPicRight], { left: 485 });
        TweenMax.to(arrowKeysPic, 0.4, { opacity: 1, delay: 2.8 });
        TweenMax.to(arrowKeysPicLeft, 0.4, { opacity: 1, repeat: 1, yoyo: true, repeatDelay: 0.4, delay: 4 });
        TweenMax.to(arrowKeysPicRight, 0.4, { opacity: 1, repeat: 1, yoyo: true, repeatDelay: 0.4, delay: 5.6 });
        TweenMax.to(arrowKeysPicLeft, 0.4, { opacity: 1, repeat: 1, yoyo: true, repeatDelay: 0.4, delay: 8 });
        TweenMax.to(arrowKeysPicRight, 0.4, { opacity: 1, repeat: 1, yoyo: true, repeatDelay: 0.4, delay: 9.6 });
    },

    page2: function() {
        TweenMax.to(document.getElementById("arrowKeysPic"), 0.4, { opacity: 0 });
        TweenMax.to([document.getElementById("arrowKeysPic"),
            document.getElementById("arrowKeysPicLeft"),
            document.getElementById("arrowKeysPicRight")
        ], 0, { opacity: 0, left: 673, delay: 0.45 });
        TweenMax.to(document.getElementById("directionsPage1"), 0.9, { x: 0, ease: Back.easeIn });
        TweenMax.to(this.nextButton, 0.5, { opacity: 0 });
        TweenMax.to(this.nextButton, 0, { x: -27, y: 0, delay: 0.51 });
        TweenMax.to(this.nextButton, 0, { opacity: 1, delay: 0.6 });
        window.setTimeout(function() { directions.nextButton.innerHTML = "Play Game" }, 600);
        gameController.buttonEnter(this.nextButton, 4.1);

        TweenMax.to(document.getElementById("directionsPage2"), 0.9, { x: 386, ease: Back.easeOut, delay: 1.2 });
        TweenMax.to(document.getElementById("smileySmall"), 0.5, {
            scale: 1,
            opacity: 1,
            ease: Back.easeOut,
            delay: 2.6
        });
        TweenMax.to(document.getElementById("redXSmall"), 0.5, {
            scale: 1,
            opacity: 1,
            ease: Back.easeOut,
            delay: 3.2
        });
    },

    page3: function() {
        TweenMax.to(document.getElementById("directionsPage2"), 0.9, { x: 0, ease: Back.easeIn });
        TweenMax.to(document.getElementById("smileySmall"), 0.4, { scale: 0, opacity: 0 });
        TweenMax.to(document.getElementById("redXSmall"), 0.4, { scale: 0, opacity: 0 });

        gameController.buttonExit(this.nextButton, 0);
        this.nextButton.removeEventListener("click", directions.nextHandler, false);
        gameCards.reverseFlip(1.5, 0.5);
        gameCards.moveHome(1, 0.75);
        TweenMax.to(document.getElementsByClassName("cardDescriptionText"), 0.5, { opacity: 1, delay: 1.95 });
        window.setTimeout(function() {
            resetGame();
            directions.nextButton.innerHTML = "Next";
            TweenMax.set(directions.nextButton, { x: 0 });
            startGame();
        }, 2000);
    }

}


gameController.initializeIntroInput();

// }
