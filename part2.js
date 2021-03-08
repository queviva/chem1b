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
    
    // add methyl ammonium
    
    // strong bases {
    ['LiOH','lithium hydroxide','lithium hydrogen','lithium acetate'],
    ['LiOH','strong base','weak base','strong acid','weak acid'],
    ['lithium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['lithium hydroxide','LiOH','Li(OH)<sub>2</sub>','LiH<sub>2</sub>'],
    
    ['NaOH','sodium hydroxide','sodium hydrogen','natric acid'],
    ['NaOH','strong base','weak base','strong acid','weak acid'],
    ['sodium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['sodium hydroxide','NaOH','Na(OH)<sub>2</sub>','NaO<sup>+</sup>'],
    
    ['KOH','potassium hydroxide','potassium hydrate','kalium hydroxide'],
    ['KOH','strong base','weak base','strong acid','weak acid'],
    ['potassium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['potassium hydroxide','KOH','POH','K(OH)<sub>2</sub>'],
    
    ['RbOH','rubidium hydroxide','ruben hydroxstein','rubium hydroxide'],
    ['RbOH','strong base','weak base','strong acid','weak acid'],
    ['rubidium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['rubidium hydroxide','RbOH','Rb(OH)<sub>2</sub>','Rb<sub>2</sub>H'],
    
    ['CsOH','caesium hydroxide','caesarium hydroxide','calcium hydrate'],
    ['CsOH','strong base','weak base','strong acid','weak acid'],
    ['caesium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['caesium hydroxide','CsOH','Cs(OH)<sub>2</sub>','Cs<sub>2</sub>HO'],

    ['Mg(OH)<sub>2</sub>','magnesium&nbsp;hydroxide','magnum hydroxide','magnate hybride'],
    ['Mg(OH)<sub>2</sub>','strong base','weak base','strong acid','weak acid'],
    ['magnesium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['magnesium hydroxide','Mg(OH)<sub>2</sub>','MgOH','Mg<sub>2</sub>HO'],

    ['Ca(OH)<sub>2</sub>','calcium hydroxide','calcium hydride','calomine hydride'],
    ['Ca(OH)<sub>2</sub>','strong base','weak base','strong acid','weak acid'],
    ['calcium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['calcium hydroxide','Ca(OH)<sub>2</sub>','CaOH','Ca<sub>2</sub>HO'],
    
    ['Sr(OH)<sub>2</sub>','strontium hydroxide','strontium hydride','strongs hydride'],
    ['Sr(OH)<sub>2</sub>','strong base','weak base','strong acid','weak acid'],
    ['strontium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['strontium hydroxide','Sr(OH)<sub>2</sub>','SrOH','S(OH)<sub>2</sub>'],

    ['Ba(OH)<sub>2</sub>','barium hydroxide','barium hydride','barium hidryde'],
    ['Ba(OH)<sub>2</sub>','strong base','weak base','strong acid','weak acid'],
    ['barium hydroxide','strong base','weak base','strong acid','weak acid'],
    ['barium hydroxide','Ba(OH)<sub>2</sub>','BaOH','Ba<sub>2</sub>OH'],
    
    //}
    
    // strong acids {
    ['HCl','strong acid','strong base','weak acid','weak base'],
    ['HCl','hydrochloric acid','hydrogen chlorate','hydric acid'],
    ['hydrochloric acid','strong acid','strong base','weak acid','weak base'],
    ['hydrochloric acid','HCl','HCl<sub>2</sub>','H<sub>2</sub>CLO'],
    
    ['HBr','strong acid','strong base','weak acid','weak base'],
    ['HBr','hydrobromic acid','hydrogen bromide','bromic acid'],
    ['hydrobromic acid','strong acid','strong base','weak acid','weak base'],

    ['hydrobromic acid','HBr','HBr<sub>2</sub>','HBm'],

    ['HI','strong acid','strong base','weak acid','weak base'],
    ['HI','hydroiodic acid','iodine hydroxide','iodic acid'],
    ['hydroiodic','strong acid','strong base','weak acid','weak base'],
    ['hydroiodic acid','HI','HIo','I(OH)<sub>2</sub>'],

    ['HClO<sub>3</sub>','strong acid','strong base','weak acid','weak base'],
    ['HClO<sub>3</sub>','chloric acid','hydrochloric acid','hydrogen chloride'],
    ['chloric acid','strong acid','strong base','weak acid','weak base'],

    ['chloric acid',
        'HClO<sub>3</sub>',
        'HClO<sub>4</sub>',
        'HClO<sub>2</sub>',
        'HClO',
        'HCLO<sub>3</sub>'],
        
    ['HClO<sub>4</sub>','strong acid','strong base','weak acid','weak base'],
    ['HClO<sub>4</sub>','perchloric&nbsp;acid','hydrochloric acid','chlorous acid','chloric acid'],
    ['perchloric acid','strong acid','strong base','weak acid','weak base'],
    ['perchloric acid',
        'HClO<sub>4</sub>',
        'HClO<sub>3</sub>',
        'HClO<sub>2</sub>',
        'HClO'],

    ['HNO<sub>3</sub>','strong acid','strong base','weak acid','weak base'],
    ['HNO<sub>3</sub>','nitric acid','nitrous acid','hydrogen nitrate'],
    ['nitric acid','strong acid','strong base','weak acid','weak base'],
    ['nitric acid',
    'HNO<sub>3</sub>',
    'HNO<sub>2</sub>',
    'H<sub>2</sub>NO<sub>4</sub>',
    'HNO'
    ],
    
    ['H<sub>2</sub>SO<sub>4</sub>','strong acid','strong base','weak acid','weak base'],
    ['H<sub>2</sub>SO<sub>4</sub>','sulfuric acid','hydrogen sulfate','hydrosulfic acid'],
    ['sulfuric acid','strong acid','strong base','weak acid','weak base'],
    ['sulfuric acid',
    'H<sub>2</sub>SO<sub>4</sub>',
    'H<sub>4</sub>SO<sub>2</sub>',
    'H<sub>2</sub>SO',
    'HSO<sub>4</sub>',
    'HSO'
    ],

    //}

    // weak acids {
    ['CH<sub>3</sub>COOH','acetic acid','acetate','formic acid'],
    ['CH<sub>3</sub>COOH','weak acid','weak base','strong acid','strong base'],
    ['acetic acid','weak acid','weak base','strong acid','strong base'],
    ['acetic acid',
        'CH<sub>3</sub>COOH',
        'CH<sub>2</sub>COOH',
        'HCOOH',
        'HA'
    ],
    
    ['HCOOH','formic acid','acetate','acetic acid'],
    ['HCOOH','weak acid','weak base','strong acid','strong base'],
    ['formic acid','weak acid','weak base','strong acid','strong base'],
    ['formic acid',
        'HCOOH',
        'CH<sub>3</sub>COOH',
        'CH<sub>2</sub>COOH',
        'H<sub>2</sub>SOH<sup>-</sup>',
        'HF'
    ],

    ['HF','hydroflouric&nbsp;acid','formic acid','acetic acid'],
    ['HF','weak acid','weak base','strong acid','strong base'],
    ['hydroflouric&nbsp;acid','weak acid','weak base','strong acid','strong base'],
    ['hydroflouric&nbsp;acid',
        'HF',
        'HCOOH',
        'CH<sub>3</sub>COOH',
        'CH<sub>2</sub>COOH',
        'H<sub>2</sub>SOH<sup>-</sup>'
    ],

    ['HCN','hydrocyanic&nbsp;acid','hydrogen&nbsp;cyanide','acetic acid'],
    ['HCN','weak acid','weak base','strong acid','strong base'],
    ['hydrocyanic&nbsp;acid','weak acid','weak base','strong acid','strong base'],
    ['hydrocyanic&nbsp;acid',
        'HCN',
        'HCNOH',
        'CHNO<sub>3</sub>',
        'H<sub>2</sub>NOH<sup>-</sup>'
    ],

    ['HNO<sub>2</sub>','nitrous&nbsp;acid','hydrogen&nbsp;nitriide','nitric acid'],
    ['HNO<sub>2</sub>','weak acid','weak base','strong acid','strong base'],
    ['nitrous&nbsp;acid','weak acid','weak base','strong acid','strong base'],
    ['nitrous&nbsp;acid',
        'HNO<sub>2</sub>',
        'HNO<sub>3/sub>',
        'HNO',
        'HCNOH',
        'CH<sub>3</sub>NOOH',
        'H<sub>2</sub>NO<sub>4</sub>'
    ],

    ['HSO<sub>4</sub><sup>-</sup>','hydrogen&nbsp;sulfate&nbsp;ion','hydrogen&nbsp;sulfate','sulfuric acid'],
    ['HSO<sub>4</sub><sup>-</sup>','weak acid','weak base','strong acid','strong base'],
    ['hydrogen&nbsp;sulfate&nbsp;ion','weak acid','weak base','strong acid','strong base'],
    ['hydrognen&nbsp;sulfate&nbsp;ion',
        'HSO<sub>4</sub><sup>-</sup>',
        'HSO<sub>3</sub><sup>-</sup>',
        'HSO',
        'H<sub>2</sub>SOH<sub>4</sub>'
    ],

    //}
    
    // weak bases {
    
    ['NH<sub>3</sub>','ammonia','ammonium','ammonium&nbsp;hydroxide'],
    ['NH<sub>3</sub>','weak base','strong base','weak acid','strong acid'],
    ['ammonia','weak base','strong base','weak acid','strong acid'],
    ['ammonia',
     'NH<sub>3</sub>',
     'NH<sub>4</sub>',
     'NH<sub>4</sub>OH',
     'HNO<sub>4</sub>'
    ],

    ['NH<sub>4</sub>OH','ammonium&nbsp;hydroxide','ammonium','ammonia'],
    ['NH<sub>4</sub>OH','weak base','strong base','weak acid','strong acid'],
    ['ammonium hydroxide','weak base','strong base','weak acid','strong acid'],
    ['ammonium hydroxide',
     'NH<sub>4</sub>OH',
     'NH<sub>3</sub>',
     'NH<sub>4</sub>',
     'HNO<sub>4</sub>'
    ],

    ['C<sub>5</sub>H<sub>5</sub>N','pyridine','carboxlyic acid','methylammonia'],
    ['C<sub>5</sub>H<sub>5</sub>N','weak base','strong base','weak acid','strong acid'],
    ['pyridine','weak base','strong base','weak acid','strong acid'],
    ['pyridine',
     'C<sub>5</sub>H<sub>5</sub>N',
     'CH<sub>3</sub>COOH',
     'HCOOH',
     'NH<sub>4</sub><sup>+</sup>',
     'HPO<sub>3</sub>'
    ],
    
    ['CO<sub>3</sub><sup>2-</sup>','carbonate ion','carboxylic acid','carbonate','hydronium'],
    
    ['CO<sub>3</sub><sup>2-</sup>','weak base','strong base','weak acid','strong acid'],
    ['carbonate ion','weak base','strong base','weak acid','strong acid'],
    ['carbonate ion',
     'CO<sub>3</sub><sup>2-</sup>',
     'CO<sub>2</sub><sup>3-</sup>',
     'CO<sub>3</sub><sup>-</sup>',
     'CO<sub>2</sub><sup>-</sup>'
    ],
        
    //}
    
    // pH pOH pKa pKb pKw {
    
    ['K<sub>w</sub>',
     '1.0 x 10<sup>-14</sup>',
     '0.1 x 10<sup>-14</sup>',
     '1.0 x 10<sup>14</sup>',
     '1.0'
    ],
    
    ['K<sub>w</sub>',
    'K<sub>a</sub>&middot;K<sub>b</sub>',
    'K<sub>a</sub> / K<sub>b</sub>',
    'K<sub>b</sub> / K<sub>a</sub>',
    '1/K<sub>b</sub>'
    ],
    
    [`<div class="ratSM"><br>
    acid HA dissociates as:<br>
    HA &rarr; H<sup>+</sup> + A<sup>-</sup><br>
    what is the K<sub><i>a</i></sub>
    </div>
     `,
     'Ka = [A<sup>-</sup>][H<sub>3</sub>O<sup>+</sup>]/[HA]',
     'false'
    ],
    
    ['lower pH means...',
     'higher hydronium',
     'higher acetate',
     'lower acidity',
     'lower H<sup>+</sup>'
    ],
    
    ['pH is ...',
     '-log([H<sub>3</sub>O<sup>+</sup>])',
     '-log([OH<sup>+</sup>])',
     'log([H<sub>2</sub>O])',
     'log([H<sup>-</sup>])'
    ],
        
    ['pOH is ...',
     '-log([OH<sup>-</sup>])',
     '-log([H<sup>+</sup>])',
     'log([H<sub>2</sub>O])',
     'log([H<sup>-</sup>])'
    ],
    
    ['acids are ...',
    'proton (H+) donors',
    'hydrides','false'
    ],
    
    ['pKa is ...',
     '-log(K<sub>a</sub>)',
     'polyvinyl acetate'
     ],

    //}
    
    // last line has no coma {
    ["ratmaster", "I am", "you are", "we are", "they be"]

    // }

];



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
