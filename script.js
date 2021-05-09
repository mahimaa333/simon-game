const startbu = document.querySelector("#start");
const endbu = document.querySelector('#stop');
const buttons = document.querySelectorAll('.buttondiv button');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const result = document.querySelector('.result');
const high = document.querySelector('#highscore');
const sc = document.querySelector('#score');
const le = document.querySelector('#level');

let pattern = [];
let userPattern = [];
let level = 0;
let click = -1;
let score = 0;
let highScore = 0;
const maxTime  = 200;

const colors = ['red','blue','yellow','green'];

    red.addEventListener('click', (event) => {
        userPattern.push('red');
        click++;
        sound('red');
        checkCor('red');
    });
    blue.addEventListener('click', (event) => {
        userPattern.push('blue');
        click++;
        sound('blue');
        checkCor('blue');
    });
    yellow.addEventListener('click', (event) => {
        userPattern.push('yellow');
        click++;
        sound('yellow');
        checkCor('yellow');
    });
    green.addEventListener('click', (event) => {
        userPattern.push('green');
        click++;
        sound('green');
        checkCor('green');
    });


function removeCursor(){
    red.style.cursor = '';
    blue.style.cursor = '';
    yellow.style.cursor = '';
    green.style.cursor = '';

}

function addCursor(){
    red.style.cursor = 'pointer';
    yellow.style.cursor = 'pointer';
    blue.style.cursor = 'pointer';
    green.style.cursor = 'pointer';
}

startbu.addEventListener('click',function(){
    if(level <= 0){
        result.innerHTML = 'The Game started'        
        playGame()
    }
});

endbu.addEventListener('click',(event) => {
    endGame();

});

function endGame(){
    removeCursor();
    result.innerHTML = 'Click Start Game to Play Again!!'
    pattern = [];
        userPattern = [];
        if(level > highScore){
            highScore = level;
            high.innerHTML = String(level);
        }
        level = 0;
        score = 0;
        click = -1;
        sc.innerHTML = String(score);
        le.innerHTML = String(level);
}

async function playGame(){
    if(score == 0){
        sc.innerHTML = String(score);
    }
    let time = 200;
    removeCursor();
    level += 1;
    time = time - Math.floor(level/3)*70;
    if(time<maxTime){
        time = maxTime;
    }
    le.innerHTML = String(level);
    var randnum = Math.floor((Math.random())*4); 
    pattern.push(colors[randnum]);
    for (var i = 0; i<pattern.length; i++){
        await new Promise((resolve) => {
            setTimeout(resolve,time)
            console.log(time);
            sound(pattern[i]);
        });   
    }        
    addCursor();
}

function checkCor(color){
    if(color == pattern[click]){
         if(userPattern.length == pattern.length){
            score += 1;
            sc.innerHTML = String(score);
             setTimeout(function(){
                userPattern = [];
                click = -1
                playGame();
             },1000);
         }
    }
    else{
        var sound = new Audio('sound/gover.mp3');
        sound.play();
        result.innerHTML = "You Lost 😐. But don't worry, Play Again!";
        removeCursor();
        pattern = [];
        userPattern = [];
        if(level > highScore){
            highScore = level;
            high.innerHTML = String(level);
        }
        level = 0;
        score = 0;
        click = -1;
    }
}

function sound(color){
    var audio = `sound/beep${color}.mp3`;
    var sound1 = new Audio(audio);
    flash(color);
    sound1.play();
    setTimeout(() =>{
        removeFlash(color);
    },200)
}

function flash(color){
    if(color === 'red'){
        red.classList.add('flash');
    }
    else if(color === 'blue'){
        blue.classList.add('flash');
    }
    else if(color === 'yellow'){
        yellow.classList.add('flash');
    }
    else if(color === 'green'){
        green.classList.add('flash');
    }
}

function removeFlash(color){
    if(color === 'red'){
        red.classList.remove('flash');
    }
    else if(color === 'blue'){
        blue.classList.remove('flash');
    }
    else if(color === 'yellow'){
        yellow.classList.remove('flash');
    }
    else if(color === 'green'){
        green.classList.remove('flash');
    }
}

