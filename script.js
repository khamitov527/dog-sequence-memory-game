const cluePauseTime = 500; 
const nextClueWaitTime = 1000;

var clueHoldTime = 1200;

var pattern = [0, 0, 0, 0, 0, 0];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var lifeCount = 3;
let timer = null; 
var time = 16;
var resetTime = false;


var sound1 = new Audio();
sound1.src = "https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/1.wav?v=1649717252462";
var sound2 = new Audio();
sound2.src = "https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/2.wav?v=1649717255527";
var sound3 = new Audio();
sound3.src = "https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/3.wav?v=1649717260436";
var sound4 = new Audio();
sound4.src = "https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/4.wav?v=1649717264359";
var sound5 = new Audio();
sound5.src = "https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/5.wav?v=1649717268688";


let menu = document.querySelector(".menu");
let game = document.querySelector(".game");
let winStats = document.querySelector(".win-stats");
let loseStats = document.querySelector(".lose-stats");
let showTime = document.getElementById("show-time");
let life1 = document.getElementById("first-life");
let life2 = document.getElementById("second-life");
let life3 = document.getElementById("third-life");
let winMessage = document.getElementById("win-message");
let loseMessage = document.getElementById("lose-message");


function playSound(btn){
  switch(btn) {
  case 1:
    sound1.play();
    break;
  case 2:
    sound2.play();
    break;
  case 3:
    sound3.play();
    break;
  case 4:
    sound4.play();
    break;
  case 5:
    sound5.play();
    break;
  default:
    return;
}
}

function stopSound(btn){
  switch(btn) {
  case 1:
    sound1.pause();
    break;
  case 2:
    sound2.pause();
    break;
  case 3:
    sound3.pause();
    break;
  case 4:
    sound4.pause();
    break;
  case 5:
    sound5.pause();
    break;
  default:
    return;
}
}

function startGame(){

  shufflePattern();
  lifeCount = 3;
  clueHoldTime = 1200;
  progress = 0;
  gamePlaying = true;

  menu.classList.add("hidden");
  game.classList.remove("hidden");
  winStats.classList.add("hidden");
  loseStats.classList.add("hidden");
  
  life1.classList.remove("hidden");
  life2.classList.remove("hidden");
  life3.classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  resetTime = true;
  menu.classList.remove("hidden");
  game.classList.add("hidden");
  winStats.classList.add("hidden");
  loseStats.classList.add("hidden");
  
  life1.classList.add("hidden");
  life2.classList.add("hidden");
  life3.classList.add("hidden");
}

function endGame(){
  gamePlaying = false;
  resetTime = true;
  menu.classList.add("hidden");
  game.classList.add("hidden");
  
  life1.classList.add("hidden");
  life2.classList.add("hidden");
  life3.classList.add("hidden");
}

function backToMenu(){
  menu.classList.remove("hidden");
  game.classList.add("hidden");
  winStats.classList.add("hidden");
  loseStats.classList.add("hidden");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}



function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playSound(btn);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; 
  for(let i=0;i<=progress;i++){ 
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) 
    delay += clueHoldTime; 
    delay += cluePauseTime;      
  }
  clueHoldTime -= 150;
  
  time = 16;
  resetTime = false;

  clearInterval(timer);
  timer = setInterval(countDown, 1000);
}


function countDown() {
    time -= 1; 
    showTime.innerHTML = "⏰ " + time;
    if (time < 0 || resetTime) {
      if(!resetTime) {
        loseStats.classList.remove("hidden");
        stopGame(); 
      }
      time = 16;
      clearInterval(timer);
    }
}


function loseGame(){
  loseStats.classList.remove("hidden");
  endGame();
}

function winGame(){
  winStats.classList.remove("hidden");
  endGame();
}


function guess(btn){
  console.log("user guessed: " + btn);

  if(!gamePlaying){
    return;
  }else if (btn != pattern[guessCounter]){
    lifeCount--;
    time = 16;
    if(lifeCount === 2){
      life1.classList.add("hidden");
    }
    if(lifeCount === 1){
      life2.classList.add("hidden");
    }
    if(!lifeCount){
      life3.classList.add("hidden");
      loseGame();  
    }
  }else if (guessCounter <= progress) {
    guessCounter += 1;
    if (guessCounter > progress && progress < pattern.length) {
      progress += 1; 
      guessCounter = 0;
      if (progress < pattern.length) {
        playClueSequence();
      } else {
        winGame();
        resetTime = true;
      }
    }
  }
} 


function shufflePattern(){
    for (var i = 0; i < pattern.length; i++) {
      pattern[i] = Math.floor(Math.random() * Math.floor(5)) + 1;
      console.log(pattern[i]);
  }
}


// Sound Synthesis Functions
// const freqMap = {
//   1: 200,
//   2: 400,
//   3: 600,
//   4: 800,
//   5: 1000
// }

// function playTone(btn,len){ 
//   o.frequency.value = freqMap[btn]
//   g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
//   context.resume()
//   tonePlaying = true
//   setTimeout(function(){
//     stopTone()
//   },len)
// }

// function startTone(btn){
//   if(!tonePlaying){
//     context.resume()
//     o.frequency.value = freqMap[btn]
//     g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
//     context.resume()
//     tonePlaying = true
//   }
// }

// function stopTone(){
//   g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
//   tonePlaying = false
// }

// // Page Initialization
// // Init Sound Synthesizer
// var AudioContext = window.AudioContext || window.webkitAudioContext 
// var context = new AudioContext()
// var o = context.createOscillator()
// var g = context.createGain()
// g.connect(context.destination)
// g.gain.setValueAtTime(0,context.currentTime)
// o.connect(g)
// o.start(0) 

