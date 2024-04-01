let startArea = document.getElementById('start-area');
let gameArea = document.getElementById('game-area');
let readyArea = document.getElementById('ready-area');
let numb01 = document.getElementById('no1');
let numb02 = document.getElementById('no2');
let symbol = document.getElementById('symbol');
let userAnswer = document.getElementById('user-answer');
let scoreValue = document.getElementById('score-value');
var timerDisplay = document.getElementById('timer');
var duration = parseInt(timerDisplay.textContent);
var countdown;
let correctAnswer = 0;
let userScoreValue = 0;

let userLevel = 1;
var userLevelFromHtml = document.getElementById('user-level');

function startTheGame(){ 
    startArea.classList.add('hidden');
    gameArea.classList.remove('hidden');
    createQuestion();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function getRandomSymbol(){
  let symbolList = ['+','-','*'];
  let randomIndex = Math.floor(Math.random() * symbolList.length);
  return symbolList[randomIndex];
}

function createQuestion(){
  let number01 = getRandomNumber();
  let number02 = getRandomNumber();
  let randomSymbol = getRandomSymbol();
  numb01.textContent = number01;
  numb02.textContent = number02;
  symbol.textContent = randomSymbol;
  userAnswer.textContent = "";

  if(randomSymbol == '+'){
    correctAnswer = number01  + number02;
  }else if (randomSymbol == '-'){
    correctAnswer = number01  - number02;

    //Remove "-" Values 
    if(correctAnswer<0){
      createQuestion();
    }
  } else if (randomSymbol == '*'){
    
    correctAnswer = number01 * number02;
    //Remove "*" More Greater Values 
    if(correctAnswer > 1000){
      createQuestion();
    }
  }
  startTimer(duration, timerDisplay);
  console.log(correctAnswer);

}


function nextQuestion (){
  clearReadyScreen();
  userLevelFromHtml.textContent = userLevel;
  duration = 10;
  createQuestion();
}

function getUserInput(event) {
  if (event.key === "Enter") {
    
    checkAnswer();

  }else if (event.keyCode >= 48 && event.keyCode <= 57) {
    userAnswer.textContent += event.key;
  } else if (event.key === "Backspace") {
    userAnswer.textContent = userAnswer.textContent.slice(0, -1);
  }
}

function setupReadyScreen(){
  startArea.classList.add('hidden');
  gameArea.classList.add('hidden');
  readyArea.classList.remove('hidden');
}

function clearReadyScreen(){
  startArea.classList.add('hidden');
  gameArea.classList.remove('hidden');
  readyArea.classList.add('hidden');
}

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function checkAnswer(){
  
  if(userAnswer.textContent == correctAnswer){
    userLevel += 1;
    userScoreValue += 10;
    
    showPopup('correct');
    
  }else{
    showPopup('incorrect');
  }
  scoreValue.textContent = userScoreValue; 

  //clear answer and next nextQuestion
  setupReadyScreen();
  clearInterval(countdown);
  await delay(5000); 
  nextQuestion();
  
  userAnswer.textContent='';
}

document.body.addEventListener('keydown', getUserInput);




function showPopup(status) {
  var popup = document.getElementById('popup');
  popup.style.display = 'block';
  popup.style.color = 'white';
  if(status == 'correct'){
    popup.innerHTML = 'Correct! Score Added.';
    popup.style.backgroundColor = 'green';
  }else{
    popup.innerHTML = 'Wrong Answer.';
    popup.style.backgroundColor = 'red';
  }
  
  
  setTimeout(function() {
    popup.style.display = 'none';
  }, 2000); 
}


function startTimer(duration, display) {
  var timer = duration;
  countdown = setInterval(function () {
      display.textContent = timer;
      if (--timer < 0) {
          clearInterval(countdown);
          checkAnswer();
      }
  }, 1000);
}