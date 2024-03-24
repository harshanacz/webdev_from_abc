
let score = 0;




body.addEventListener('keydown', function(e){
    if(e.key === document.getElementById('text').textContent){
       score = score + 10;
       document.getElementById('score').textContent = score;
        makeLetter();
        console.log('Correct');
    }else{
        console.log('Incorrect');
    
    }
});
function makeLetter(){
    startTimer();
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let letter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('text').textContent = letter;
}

function hideButton(){
    document.getElementById('btn').style.display = 'none';
    document.getElementById('text').classList.add('typing-text')
}



const progress = document.querySelector('progress');
let timer;
const miss = document.getElementById('miss');
let missCount = 0;

function startTimer(){
    progress.value = 0;
    clearInterval(timer);
    
    timer =  setInterval(function(){
        progress.value += 10;
        if(progress.value === 100){
            missCount += 1;
            miss.textContent = missCount;
            clearInterval(timer);
            makeLetter();
        }
    }, 1000);
}