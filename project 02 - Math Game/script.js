let startButton = document.getElementById('start-btn');
let gameArea = document.getElementById('game-area');
gameArea.classList.add('hidden');

function startTheGame(){
    startButton.classList.add('hidden');
    gameArea.classList.remove('hidden');
}