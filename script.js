const cluePauseTime = 200; 
const nextClueWaitTime = 200;

var clueHoldTime = 1200;

var pattern = [0, 0, 0, 0, 0, 0];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var lifeCount = 3;
let timer = null; 
var time = 15;
var resetTime = false;


function startGame(){
  
  shufflePattern();
  lifeCount = 3;
  clueHoldTime = 1200;
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  document.getElementById("show-instructions").classList.add("hidden");
  document.getElementById("show-life").classList.remove("hidden");
  document.getElementById("show-time").classList.remove("hidden");
  document.getElementById("first-life").classList.remove("hidden");
  document.getElementById("second-life").classList.remove("hidden");
  document.getElementById("third-life").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  resetTime = true;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
    
  document.getElementById("show-instructions").classList.remove("hidden");
  document.getElementById("show-life").classList.add("hidden");
  document.getElementById("show-time").classList.add("hidden");
  document.getElementById("first-life").classList.add("hidden");
  document.getElementById("second-life").classList.add("hidden");
  document.getElementById("third-life").classList.add("hidden");
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
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}


function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; 
  for(let i=0;i<=progress;i++){ 
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) 
    delay += clueHoldTime; 
    delay += cluePauseTime;
  }
  clueHoldTime -= 150;
  
  time = 15;
  resetTime = false;

  clearInterval(timer);
  timer = setInterval(countDown, 1000);
}


function countDown() {
    time -= 1; 
    document.getElementById("show-time").innerHTML =
      "TIME REMAINING: " + time;
    if (time < 0 || resetTime) {
      if(!resetTime) {
        alert("Time's up. You lost.");
        stopGame(); 
      }
      time = 15;
      clearInterval(timer);
    }
}


function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won.");
}


function guess(btn){
  console.log("user guessed: " + btn);

  if(!gamePlaying){
    return;
  }else if (btn != pattern[guessCounter]){
    lifeCount--;
    time = 15;
    if(lifeCount === 2){
      document.getElementById("first-life").classList.add("hidden");
    }
    if(lifeCount === 1){
      document.getElementById("second-life").classList.add("hidden");
    }
    if(!lifeCount){
      document.getElementById("third-life").classList.add("hidden");
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
const freqMap = {
  1: 200,
  2: 400,
  3: 600,
  4: 800,
  5: 1000
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0) 