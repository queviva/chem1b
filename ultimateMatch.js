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

// these variables can be later changed based on user preference and also performance
var correctDelay = 0.1;
var incorrectDelay = 1.3;


var initialQuestions = [



  ["Cu<sub>2</sub>SO<sub>3</sub>", "copper(I) sulfite", "copper(II) sulfite", "copper(I) sulfate"],
  ["TiO<sub>2</sub>", "titanium(IV) oxide", "titanium dioxide", "titanium oxide", "titanium(II) oxide"],
  ["CaBr<sub>2</sub>", "calcium bromide", "calcium dibromide", "calcium(II) bromide"],
  ["Fe(NO<sub>3</sub>)<sub>3</sub>", "iron(III) nitrate", "iron(III) nitride", "iron(III) nitrite"],
  ["NO", "nitrogen monoxide", "nitrogen oxide", "nitrogen monoxygen"],
  ["Cl<sub>2</sub>O", "dichlorine monoxide", "chlorine dioxide", "dichlorine oxide", "chlorine oxide"],
  ["HI", "hydroiodic acid", "iodic acid", "iodous acid"],
  ["NaClO", "sodium hypochlorite", "sodium chlorite", "sodium chlorate", "sodium perchlorate", "sodium chloroxide"],
  ["LiIO<sub>2</sub>", "lithium iodite", "lithium iodide", "lithium iodate", "lithium hypoiodite", "lithium periodate"],
  ["HCN", "hydrocyanic acid", "carbonic acid", "cyanic acid", "hydrocyanous acid"],
  ["KNO<sub>2</sub>", "potassium nitrite", "potassium nitrate", "potassium nitride"],
  
  ["lithium peroxide", "Li<sub>2</sub>O<sub>2</sub>", "Li<sub>2</sub>O", "LiO<sub>2</sub>"],
  ["lithium nitride", "Li<sub>3</sub>N", "LiN", "LiNO<sub>2</sub>", "LiN<sub>3</sub>", "LiNO<sub>3</sub>"],
  ["sodium bromide", "NaBr", "NaBr<sub>2</sub>", "Na<sub>2</sub>Br", "NaBr<sub>3</sub>"],
  ["sodium phosphite", "Na<sub>3</sub>PO<sub>3</sub>", "Na<sub>3</sub>PO<sub>4</sub>", "Na<sub>3</sub>PO<sub>2</sub>", "Na<sub>3</sub>P"],
  ["sodium hydrogen phosphate", "Na<sub>2</sub>HPO<sub>4</sub>", "NaHPO<sub>4</sub>", "Na<sub>2</sub>HPO<sub>3</sub>", "NaH<sub>2</sub>PO<sub>4</sub>"],
  ["potassium iodide", "KI", "KI<sub>2</sub>", "K<sub>2</sub>I", "KI<sub>3</sub>"],
  ["potassium sulfite", "K<sub>2</sub>SO<sub>3</sub>", "KSO<sub>3</sub>", "K<sub>2</sub>SO<sub>2</sub>", "K<sub>2</sub>S"],
  ["lithium hydrogen carbonate", "LiHCO<sub>3</sub>", "LiHCO<sub>4</sub>", "Li<sub>2</sub>HCO<sub>3</sub>"],


  ["beryllium fluoride", "BeF<sub>2</sub>", "BeF", "Be<sub>2</sub>F", "BeF<sub>3</sub>", "Be<sub>3</sub>F"],
  ["magnesium nitride", "Mg<sub>3</sub>N<sub>2</sub>", "MgN", "MgN<sub>2</sub>", "Mg<sub>3</sub>N", "Mg<sub>2</sub>N<sub>3</sub>"],
  ["calcium oxide", "CaO", "Ca<sub>3</sub>O<sub>2</sub>", "CaO<sub>2</sub>", "Ca<sub>2</sub>O", "Ca<sub>2</sub>O<sub>3</sub>"],
  ["calcium perchlorate", "Ca(ClO<sub>4</sub>)<sub>2</sub>", "CaClO<sub>4</sub>", "Ca(ClO<sub>3</sub>)<sub>2</sub>", "Ca(ClO)<sub>2</sub>"],
 
  ["strontium sulfide", "SrS", "Sr<sub>2</sub>S", "SrS<sub>2</sub>", "Sr<sub>2</sub>S<sub>3</sub>"],
  ["barium sulfide", "BaS", "Ba<sub>3</sub>S<sub>2</sub>", "BaS<sub>2</sub>", "Ba<sub>2</sub>S", "Ba<sub>2</sub>S<sub>3</sub>"],
  
  ["aluminum chloride", "AlCl<sub>3</sub>", "AlCl", "AlCl<sub>2</sub>", "Al<sub>3</sub>Cl", "Al<sub>2</sub>Cl<sub>3</sub>"],
  ["aluminum oxide", "Al<sub>2</sub>O<sub>3</sub>", "AlO", "AlO<sub>2</sub>", "AlO<sub>3</sub>", "Al<sub>2</sub>O"],
  ["aluminum phosphide", "AlP", "AlP<sub>3</sub>", "Al<sub>3</sub>P", "Al<sub>2</sub>P<sub>3</sub>", "Al<sub>3</sub>P<sub>2</sub>"],
  
  ["nickel(II) nitrate", "Ni(NO<sub>3</sub>)<sub>2</sub>", "Ni(NO<sub>2</sub>)<sub>2</sub>", "Ni<sub>2</sub>NO<sub>3</sub>"],
  ["cobalt(III) hydroxide", "Co(OH)<sub>3</sub>", "Co<sub>3</sub>OH", "CoH<sub>3</sub>"],
  
  ["hypochlorous acid", "HClO", "HClO<sub>3</sub>", "HCl", "HClO<sub>4</sub>"],
  
  ["dinitrogen pentoxide", "N<sub>2</sub>O<sub>5</sub>", "N<sub>5</sub>O<sub>2</sub>", "N<sub>2</sub>O<sub>4</sub>"],
  ["ammonium hydroxide", "NH<sub>4</sub>OH", "NH<sub>3</sub>OH","NH<sub>4</sub>H"],

  ["hydrochloric acid","HCl", "H<sub>2</sub>Cl","HCl<sup>-</sup>"],
  ["HCl", "hydrochloric acid","hydrochlorous acid","hydrogen chlorite"],
  ["HCl", "strong acid", "strong base", "weak acid", "weak base"],

  ["hydrobromic acid","HBr", "H<sub>2</sub>Br","HBr<sup>2+</sup>"],
  ["HBr", "hydrobromic acid","bromic acid","hydrobromide"],
  ["HBr", "strong acid", "strong base", "weak acid", "weak base"],
  
  ["hydroiodic acid","HI", "H<sub>2</sub>I","HI<sub>2</sub>"],
  ["HI", "hydroiodic acid","hidiotic acid","hydroiodide"],
  ["HI", "strong acid", "strong base", "weak acid", "weak base"],

  ["nitric acid","HNO<sub>3</sub>", "H<sub>2</sub>NO","HNO<sub>4</sub>"],
  ["HNO<sub>3</sub>", "nitric acid","nitrous acid","hydrogen nitrite"],
  ["HNO<sub>3</sub>", "strong acid", "strong base", "weak acid", "weak base"],

  ["chloric acid","HClO<sub>3</sub>", "H<sub>2</sub>ClO","HClO<sub>4</sub>"],
  ["HClO<sub>3</sub>", "chloric acid","chlorous acid","hydrogen chlorite"],
  ["HClO<sub>3</sub>", "strong acid", "strong base", "weak acid", "weak base"],

  ["perchloric acid","HClO<sub>4</sub>", "H<sub>4</sub>ClO","HClO<sub>3</sub>"],
  ["HClO<sub>4</sub>", "perchloric acid","perchlorous acid","perchlorite"],
  ["HClO<sub>4</sub>", "strong acid", "strong base", "weak acid", "weak base"],

  ["sulfuric acid","H<sub>2</sub>SO<sub>4</sub>", "H<sub>4</sub>SO","HSO<sub>3</sub>"],
  ["H<sub>2</sub>SO<sub>4</sub>", "sulfuric acid", "sulfurous acid","hydrosulfuric acid"],
  ["H<sub>2</sub>SO<sub>4</sub>", "strong acid", "strong base", "weak acid", "weak base"],

  ["lithium hydroxide","LiOH", "Li<sub>2</sub>OH<sub>2</sub>","LiH","Li(OH<sup>-</sup>)"],
  ["LiOH", "lithium hydroxide", "lithium alkylide", "livermorium oxide"],
  ["LiOH", "strong base", "weak base", "strong acid", "weak acid"],

  ["sodium hydroxide", "NaOH", "Na<sub>2</sub>OH<sub>2</sub>","NaH","Na(OH)<sub>2</sub>"],
  ["NaOH", "sodium hydroxide", "sodium alkylide", "potassium hydroxide", "sodium oxide"],
  ["NaOH", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["potassium hydroxide", "KOH", "K<sub>2</sub>OH<sub>2</sub>","KIH","K(OH)<sub>2</sub>"],
  ["KOH", "potassium hydroxide", "potassium alkylide", "potassium hydroxite", "potassium oxide"],
  ["KOH", "strong base", "weak base", "strong acid", "weak acid"],

  ["rubidium hydroxide", "RbOH", "R<sub>2</sub>OH<sub>2</sub>","RbH","K(OH)<sub>2</sub>"],
  ["RbOH", "rubidium hydroxide", "rubidium alkylide", "rubidium hydroxite", "rubidium oxide"],
  ["RbOH", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["cesium hydroxide", "CsOH", "Cs<sub>2</sub>OH<sub>2</sub>","CsH","K(OH)<sub>2</sub>"],
  ["CsOH", "cesium hydroxide", "cesium alkylide", "cesium hydroxite", "cesium oxide"],
  ["CsOH", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["calcium hydroxide", "Ca(OH)<sub>2</sub>", "Ca<sub>2</sub>OH<sub>2</sub>","CaH","Ca(OH<sup>-</sup>)"],
  ["Ca(OH)<sub>2</sub>", "calcium hydroxide", "calcium alkylide", "california hydroxide", "calcium oxide"],
  ["Ca(OH)<sub>2</sub>", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["strontium hydroxide", "Sr(OH)<sub>2</sub>", "Sr<sub>2</sub>OH<sub>2</sub>","SrH","Sr(OH<sup>-</sup>)"],
  ["Sr(OH)<sub>2</sub>", "strontium hydroxide", "strontium alkylide", "strong hydroxide", "strontium oxide"],
  ["Sr(OH)<sub>2</sub>", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["barium hydroxide", "Ba(OH)<sub>2</sub>", "Ba<sub>2</sub>OH<sub>2</sub>","BrH","Ba(OH<sup>-</sup>)"],
  ["Ba(OH)<sub>2</sub>", "barium hydroxide", "barium alkylide", "barium hydroxite", "barium oxide"],
  ["Ba(OH)<sub>2</sub>", "strong base", "weak base", "strong acid", "weak acid"],
  
  ["acetic acid", "CH<sub>3</sub>COOH", "C<sub>3</sub>HCOOH", "CH<sub>2</sub>COH", "CH<sub>3</sub>COOH<sub>3</sub>"],
  ["CH<sub>3</sub>COOH", "acetic acid", "acetate", "acenine acid", "acetous acid"],
  ["CH<sub>3</sub>COOH", "weak acid", "weak base", "strong acid", "strong base"],
  ["acetic acid <i>or...</i>", "ethanoic acid", "ethanol", "ethynic acid"],

  ["hydrofluoric acid", "HF", "HF<sub>2</sub>", "H<sub>2</sub>F", "HFl"],
  ["HF", "hydrofluoric acid", "hydrogen fluorice", "hydrogen fluorine", "fluoric acid"],
  ["HF", "weak acid", "weak base", "strong acid", "strong base"],

  ["hydrogen sulfide", "H<sub>2</sub>S", "H<sub>2</sub>S<sub>2</sub>", "HSl"],
  ["H<sub>2</sub>S", "hydrogen sulfide", "hydrogen sulfur", "sulfurous acid", "sulfuric acid"],
  ["H<sub>2</sub>S", "weak acid", "weak base", "strong acid", "strong base"],
  
  ["ammonia", "NH<sub>3</sub>", "NH<sub>4</sub><sup>+<sup>", "HNO<sub>3</sub>"],
  ["NH<sub>3</sub>", "ammonia", "ammonium", "ammoric", "nitro hydrate"],
  ["NH<sub>3</sub>", "weak base", "weak acid", "strong acid", "strong base"],

  ["trimethyl ammonia", "N(CH<sub>3</sub>)<sub>3</sub>", "N(CH<sub>4</sub>)<sub>3<sub>", "HN(CH<sub>3</sub>)<sub>3</sub>", "N(CH<sub>2</sub>)<sub>3</sub>"],
  ["N(CH<sub>3</sub>)<sub>3</sub>", "trimethyl ammonia", "trimethane ammonia", "triemeth ammonium", "methyl ammonia"],
  ["N(CH<sub>3</sub>)<sub>3</sub>", "weak base", "weak acid", "strong acid", "strong base"],


  ["alkane", "single C bond", "double C bond", "triple C bond", "carbon ring"],
  ["alkane", "C&mdash;C ", "C=C", "C&equiv;C", "carbon ring"],
  ["alkene", "double C bond", "single C bond", "triple C bond", "carbon ring"],
  ["alkene", "C=C ", "C&mdash;C", "C&equiv;C", "carbon ring"],
  ["alkyne", "triple C bond", "double C bond", "single C bond", "carbon ring"],
  ["alkyne", "C&equiv;C ", "C&mdash;C", "C=C", "carbon ring"],
  ["aromatic", "carbon ring", "double C bond", "single C bond", "triple C bond"],

  ["<i>methane is an</i>", "alkane", "alkyne", "alkene", "alkaline", "alkaholic"],
  ["CH<sub>4</sub>", "methane", "acetylene", "propane", "acetate"],
  ["C<sub>2</sub>H<sub>6</sub>", "ethane", "methane", "propane", "butane"],
  ["C<sub>3</sub>H<sub>8</sub>", "propane", "ethane", "methane", "butane"],
  ["C<sub>4</sub>H<sub>10</sub>", "butane", "ethane", "methane", "propane"],
  ["C<sub>5</sub>H<sub>12</sub>", "pentane", "propane", "ethane", "methane", "butane"],
  
  ["CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>", "<i>n-</i>butane", "isobutane", "propane", "ethanol"],

  ["<i>n-</i>butane",
    "CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>",
    "CH<sub>3</sub>CH<sub>2</sub>CH<sub>3</sub>",
    "CH<sub>3</sub>CH<sub>2</sub>CH<sub>3</sub>CH<sub>3</sub>",
    "CH<sub>2</sub>CH<sub>3</sub>CH<sub>3</sub>CH<sub>2</sub>",
    "CH<sub>3</sub>(CH<sub>2</sub>)<sub>3</sub>CH<sub>3</sub>"
  ],
  
  ["isobutane",
    "(CH<sub>3</sub>)<sub>2</sub>CHCH<sub>3</sub>",
    "(CH<sub>2</sub>)<sub>3</sub>CHCH<sub>2</sub>",
    "(CH<sub>3</sub>)<sub>3</sub>CHCH<sub>2</sub>",
    "CH<sub>3</sub>CH<sub>2</sub>(CH<sub>3</sub>)<sub>2</sub>",
    "CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>",
    "CH<sub>3</sub>(CH<sub>2</sub>)<sub>3</sub>CH<sub>3</sub>"
  ],

  ["C<sub>n</sub>H<sub>(2n+2)</sub>", "~ane", "~ene", "~ine", "~yne"],
  ["&mdash;CH<sub>3</sub>", "methyl group", "methane group", "alkane", "alkaloid"],
  ["HC&equiv;CH", "acetylene", "methane", "propane", "acetate"],
  ["<i>acetylene is an</i>", "alkyne", "alkane", "alkene", "alkaline", "alkaholic"],
  ["'acetylene' <i>or...</i>", "ethyne", "ethane", "ethanol", "ethine", "methene"],
  
  


  // some constants

  ["<i>c ... light speed =</i>",
  "2.9979 x 10<sup>8</sup> m/s",
  "2.9799 x 10<sup>8</sup> m/s",
  "2.979 x 10<sup>6</sup> m",
  "2.9979 x 10<sup>6</sup> m*s<sup>-2<sup>",
  "2.9979 x 10<sup>6</sup> j",
  "3.000 x 10<sup>-8</sup> ms"
  ],

  ["<i>h ... planck's const = </i>",
  "6.626 x 10<sup>-34</sup> J*s",
  "6.626 x 10<sup>-44</sup> kg*m<sup>2</sup>/s",
  "6.226 x 10<sup>-34</sup> J*s",
  "6.022 x 10<sup>23</sup> J",
  "8.622 x 10<sup>-14</sup> eV",
  "2.626 x 10<sup>-34</sup> amu",
  "3.1415 x 10<sup>-34</sup> J*s"
  ],
  
  ["<i>mole ... = </i>",
  "6.022 x 10<sup>23</sup>",
  "6.002 x 10<sup>23</sup>",
  "6.202 x 10<sup>32</sup>",
  "6.626 x 10<sup>-34</sup> J*s",
  "2.9979 x 10<sup>8</sup>"
  ],
  
  ["<i>amu ... = </i>",
  "1.660 x 10<sup>-24</sup> kg",
  "1.606 x 10<sup>-24</sup> kg",
  "1.006 x 10<sup>-24</sup> kg",
  "1.660 x 10<sup>-14</sup> kg",
  "6.626 x 10<sup>-34</sup> J*s",
  "6.022 x 10<sup>23</sup>m"
  ],
  
  ["<i>g... gravity = </i>",
  "9.806 m/s<sup>2</sup>",
  "9.608 m/s<sup>2</sup>",
  "9.806 m/s",
  "10.06 ms",
  "9.806 ms<sup>2</sup>"
  ],
  
  ["<i>wien's dis. const =</i>",
  "2.898 * 10<sup>-3</sup> mK",
  "2.988 * 10<sup>-3</sup> mK",
  "2.898 * 10<sup>-13</sup> kg/s",
  "2.066 * 10<sup>23</sup> grams"
  ],
  
  ["rydberg energy (R<sub>E</sub>)",
  "2.178 x 10<sup>-18</sup> J",
  "2.781 x 10<sup>-18</sup> J",
  "2.178 x 10<sup>18</sup> J",
  "2.898 x 10<sup>-13</sup> mK"
  ],

  ["rydberg &lambda; (R)",
  "1.097 x 10<sup>-7</sup> m<sup>-1</sup>",
  "1.079 x 10<sup>-7</sup> m<sup>2</sup>",
  "1.997 x 10<sup>-7</sup> 1/m",
  "2.178 x 10<sup>-18</sup> J"
  ],



  // equations
  
  ["<i>E [of photon] = ...</i>",
  "<i>hc / &lambda;</i>",
  "<i>h&lambda; / c</i>",
  "<i>hc / &nu;</i>"],
  
  ["<i>wavelength = ...</i>",
  "<i>c / &nu;</i>",
  "<i>h&lambda; / c</i>",
  "<i>c / &lambda;</i>"],

  ["<i>wavelength = ...</i>",
  "<i>h/(mass*vel)</i>",
  "<i>h&lambda; / mass</i>",
  "<i>c / &lambda;</i>"],
  
  ["<i>wavelength ...</i>",
  "<i>&lambda; = h/&radic;(2*E*mass)</i>",
  "<i>&lambda; = h&lambda; / mass<sup>2</sup></i>",
  "<i>&lambda; = c / &nu;<sup>2</sup></i>",
  "<i>&lambda; = h / &delta;</i>"
  ],
  
  ["wien's disp. law",
  "Temp = b / &lambda;<sub>max</sub>",
  "Temp = &lambda;<sub>max</sub> / b",
  "Temp = c / b",
  "Temp = &delta; / h"
  ],
  
  ["kinetic energy",
  "KE = (1/2)*mass*vel<sup>2</sup>",
  "KE = mass*vel<sup>2</sup>",
  "KE = (1/2)*mass<sup>2</sup>vel<sup>2</sup>",
  "KE = &lambda; / &delta; h"
  ],
  
  ["<i>emission (&Delta;E) = ...</i>",
  "R*(1/n<sub>f</sub><sup>2</sup> - 1/n<sub>i</sub><sup>2</sup>)",
  "R*(1/n<sub>f</sub> - 1/n<sub>i</sub>)",
  "R*(1/n<sub>i</sub><sup>2</sup> - 1/n<sub>f</sub><sup>2</sup>)",
  "R*(1/2)*mv<sup>2</sup>"
  ],
  
  ["<i>1 / &lambda; = ...</i>",
  "R*(1/n<sub>f</sub><sup>2</sup> - 1/n<sub>i</sub><sup>2</sup>)",
  "R*(1/n<sub>f</sub> - 1/n<sub>i</sub>)",
  "R*(1/n<sub>i</sub><sup>2</sup> - 1/n<sub>f</sub><sup>2</sup>)",
  "R*(1/2)*mv<sup>2</sup>"
  ],


  ["wavelength is ...", "&lambda; (lambda)", "&nu; (nu)", "&sigma; (sigma)", "&rho; (rho)"],
  
  ["frequency is ...", "&nu; (nu)", "&lambda; (lambda)", "&sigma; (sigma)", "&rho; (rho)"],
  
  ["planck's # ...", "h", "c", "&lambda; (lambda)", "&sigma; (sigma)", "&#8463;"],
  
  ["speed of light", "c", "&hbar;", "&lambda; (lambda)", "&sigma; (sigma)", "&rho; (rho)"],
  
  ["wien's dis. const", "b", "&hbar;", "&lambda; (lambda)", "&delta; (delta)", "&rho; (rho)"],
  
  // motor proteins
  
  ["kinesins move...",
  "to plus end", "to minus end", "to center" ],

  ["kinesins move...",
  "to periphery",  "to minus end", "to center"],
  
  ["dyneins move...",
  "to minus end", "to plus end", "your stuff"],
  
  ["myosins use",
  "actin", "reactin", "yactin", "miosis"],
  
  ["myosins move on",
  "microfilaments",  "microtubules", "cryptoplasm", "nematodes"],
  
  // electron configurations
  

  ["carbon (C)",
  "1s<sup>2</sup>2s<sup>2</sup>2p<sup>2</sup>",
  "1s<sup>2</sup>2d<sup>2</sup>2p<sup>3</sup>",
  "1s<sup>2</sup>2p<sup>2</sup>2d<sup>4</sup>"
  ],

  ["nitrogen (N)",
  "1s<sup>2</sup>2s<sup>2</sup>2p<sup>3</sup>",
  "1s<sup>2</sup>2d<sup>2</sup>2p<sup>2</sup>",
  "1s<sup>2</sup>2p<sup>2</sup>2d<sup>4</sup>"
  ],

  ["oxygen (O)",
  "1s<sup>2</sup>2s<sup>2</sup>2p<sup>4</sup>",
  "1s<sup>2</sup>2d<sup>2</sup>2p<sup>4</sup>",
  "1s<sup>2</sup>2p<sup>2</sup>2d<sup>4</sup>"
  ],
  
  ["chromium (Cr)",
  "[Ar]4s<sup>1</sup>3d<sup>5</sup>",
  "[Ar]4s<sup>2</sup>3d<sup>4</sup>",
  "[Ar]3s<sup>1</sup>3d<sup>5</sup>"
  ],
  
  ["iron (Fe)",
  "[Ar]4s<sup>2</sup>3d<sup>6</sup>",
  "[Ar]4s<sup>2</sup>3d<sup>9</sup>",
  "[Ar]4s<sup>2</sup>3d<sup>8</sup>"
  ],

  ["copper (Cu)",
  "[Ar]4s<sup>1</sup>3d<sup>10</sup>",
  "[Ar]4s<sup>2</sup>3d<sup>9</sup>",
  "[Ar]3s<sup>1</sup>3d<sup>10</sup>"
  ],
  
  ["all <i>paired</i> electrons",
  "diamagnetism",
  "paramagnetism",
  "magnetoism",
  "magnification"
  ],

  ["<i>un</i>paired electrons",
  "paramagnetism",
  "diamagnetism",
  "maggietism"
  ],

  //["<img src=AcidChloride-Group.gif>", "I am", "you are", "we are", "they be"]

  
  // last line has no coma
  ["ratmaster", "I am", "you are", "we are", "they be"]
  
  
];



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

