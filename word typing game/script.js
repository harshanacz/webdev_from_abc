let body = document.querySelector('body');
let starting_window = document.getElementById('starting_window');
let playing_window = document.getElementById('playing_window');
let begin = false;
let word;
let focusWord = document.getElementById('focusWord');
let isColored = false;

let wordIndex = 0;
let correct = 0;

body.addEventListener('keydown', function (e) {
    if (begin == false) {
        if (e.key === ' ') {
            starting_window.style.display = 'none';
            playing_window.style.display = 'block';
            begin = true;
            startTheGame();

        }
    } else {
        if (word[wordIndex] === e.key) {
            wordIndex++;
            correct++;
            colorFinishedLetters(wordIndex);
            if(isColored){
                removeColor();
                isColored = false;
            }
            
            
        }else{
            addColor(wordIndex+1, 'red');
            isColored = true;
        }

    }
});

function colorFinishedLetters(currentIndex){
    var text = focusWord.textContent.trim();
    var newText = "<span style='color: grey;'>" + text.substring(0, currentIndex) + "</span>" + text.substring(currentIndex);
    focusWord.innerHTML = newText;
}

function addColor(currentIndex, color){
    var text = focusWord.textContent.trim();
    var newText = "<span style='color: " + color + ";'>" + text.substring(currentIndex-1, currentIndex) + "</span>" + text.substring(currentIndex);
    focusWord.innerHTML = newText;
}

function removeColor(){
    colorFinishedLetters();
}


async function startTheGame() {
    await fetchWord();

}




async function fetchWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const wordDoc = await response.json();
    word = wordDoc[0];
    if (word.length < 3) {
        fetchWord();
    } 
    focusWord.textContent = word;
}
