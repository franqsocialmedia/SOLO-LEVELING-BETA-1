import { player } from "./Player_mod.js";

//Modulo de objetos y declaracion de variables

export var panel = document.getElementById('panel-content');
export var main = document.getElementById('main-screen');


export var dailyBtn = document.getElementById('daily-btn');
export var statusBtn = document.getElementById('status-btn');
export var questBtn = document.getElementById('quest-btn');
export var inventoryBtn = document.getElementById('inventory-btn');

export var modeBtn = document.getElementById('mode-btn');
export var fatigueBtn = document.getElementById('fatigue-btn');
export var adviceBtn = document.getElementById('advice-icons');

export var iteractionBtn = document.getElementById('system-btn');
export var helpBtn = document.getElementById('help-content');

export var hpBar = document.getElementById('hpBar');
export var mpBar = document.getElementById('mpBar');

export var fatigue = document.getElementById("fatigue-porcent");

export let reductionLifeRate = (player.timeout / ((player.timeout*60)*60)); // 0.0002777777777777778;
//alert("reduccion de vida es de: "+reductionLifeRate);

export let reductionMotivationRate = (mpBar.max / ((4.5*60)*60)); // 0.04938271604938271;
//alert("reduccion de motivacion es de: "+reductionMotivationRate);

export let fatigueRate = 100 / (25 * 60); // 0.06666666666666667;
//alert("reduccion de fatiga es de: "+fatigueRate);
