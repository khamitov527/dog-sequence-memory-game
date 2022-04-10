
const clueHoldTime = 1000;
const cluePauseTime = 333; 
const nextClueWaitTime = 1000;

var pattern = [];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var numMistakes = 0
var timeRemaining;
var countDown;


	
function generatePattern(){
  for (let i = 0; i <= 9; i++){
  pattern.push(Math.floor(Math.random() * 5) + 1);
  }
  
}
function timer(){
  countDown = countDown - 1;
  if (countDown <= -1) {
    clearInterval(timeRemaining);
    loseGame();
    return;
  }
  document.getElementById("timer").innerHTML = 
    "Time Remaining: " + countDown;
}


function startGame(){
  
  
  progress = 0;
  gamePlaying = true;
  
  clearInterval(countDown);
  pattern = []
    
  numMistakes = 0;
    
  generatePattern()
  
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  
  
  
  playClueSequence();
  setTimeout(() => {
    document.getElementById("timer").classList.remove("hidden");
  }, 100);  
}

function stopGame(){
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  	    document.getElementById("timer").classList.add("hidden");
    clearInterval(countDown);
    clearInterval(timeRemaining);
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
  	
    clearInterval(timeRemaining);
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; 
  for(let i=0;i<=progress;i++){ 
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) 
    delay += clueHoldTime 
    delay += cluePauseTime;
        clueHoldTime -= 30
    countDown =  3*(progress + 2); 
    if(clueHoldTime <=500){
      clueHoldTime = 500
    }
  }
  timeRemaining = setInterval(timer, 1000)
}


function loseGame(){
  stopGame();
  document.getElementById("life1").classList.remove("hidden")
  document.getElementById("life2").classList.remove("hidden")
  document.getElementById("life3").classList.remove("hidden")
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
  }
  
  if(pattern[guessCounter] == btn){
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        winGame();
      }else{
        progress++;
        playClueSequence();
      }
    }else{
      guessCounter++;
    }
  }else{
    numMistakes++;
    if(numMistakes == 1){
      document.getElementById("life1").classList.add("hidden");
    }
    if(numMistakes == 2){
      document.getElementById("life2").classList.add("hidden");
    }
    if(numMistakes == 3){
      document.getElementById("life3").classList.add("hidden");
      loseGame();  
    } else{
      playClueSequence()
    }
  }
} 



// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 238,
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