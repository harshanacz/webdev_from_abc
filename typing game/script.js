
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
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let letter = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById('text').textContent = letter;
}

function hideButton(){
    document.getElementById('btn').style.display = 'none';
    document.getElementById('text').classList.add('typing-text')
}