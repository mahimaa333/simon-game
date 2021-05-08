const startbu = document.querySelector("#start");
const buttons = document.querySelectorAll('.buttondiv button');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const result = document.querySelector('.result');

// for (var i = 0; i<buttons.length; i++){
//         buttons[i].addEventListener('click', function(){
//             var buttonclass = this.getAttribute('class');
//             sound(buttonclass);
//         });
// }

startbu.addEventListener("click",randomPlay());

function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

async function randomPlay(){
    let pattern = [];
    const colors = ['red','blue','yellow','green'];
    for (var i = 0; i < 15; i++){
        var randnum = Math.floor((Math.random())*4);
        pattern.push(colors[randnum]);
    }
    console.log(pattern);
    for(var i = 0; i<pattern.length; i++){  
        await new Promise((resolve) => {
            setTimeout(resolve,50)
            console.log(pattern[i]);
            sound(pattern[i]);
        });    
    }

    await new Promise((resolve) => {
        setTimeout(resolve,2000)
        playGame();
    });
}


async function playGame(){
    const colors = ['red','blue','yellow','green'];
    let pattern = [];
    let userPattern = [];
    let game = true;
    var l = 0;
    let score = 0;
    let count = 0;
    let win = false;
    while(l < 15){
        if(count%2 == 0){
            var randnum = Math.floor((Math.random())*4);
            pattern.push(colors[randnum]);
            for(var i = 0; i<pattern.length; i++){          
                await new Promise((resolve) => {
                    setTimeout(resolve,500)
                    console.log(pattern[i]);
                    sound(pattern[i]);
                });   
            }
            count += 1;
        }
        else{
            for(var i = 0; i < pattern.length; i++){
                red.addEventListener('click', (event) => {
                    userPattern.push('red');
                    sound('red');
                });
                blue.addEventListener('click', (event) => {
                    userPattern.push('blue');
                    sound('blue');
                });
                yellow.addEventListener('click', (event) => {
                    userPattern.push('yellow');
                    sound('yellow');
                });
                green.addEventListener('click', (event) => {
                    userPattern.push('green');
                    sound('green');
                });
                if(l === 14){
                    if(userPattern === patten){
                        result.innerHTML = 'Yayy Win!';
                        break;
                    }
                }
                if(userPattern === pattern){
                    score = score+1;
                    result.innerHTML = `${score}`;
                }
                else{
                    result.innerHTML = "You Lose 😐. But don't worry, Play Again!";
                    break;
                }
            }
        }
    }
}

function sound(color) {
    switch (color) {
        case 'red':
            red.style.boxShadow = '5px 10px 20px 10px hsl(0, 73%, 58%)';
            var sound1 = new Audio('./sound/beep1.mp3');
            sound1.play();  
            red.style.boxShadow = 'none';          
            break;
        case 'blue':
            blue.style.boxShadow = '5px 10px 20px 10px hsl(50, 73%, 58%)';
            var sound2 = new Audio('./sound/beep2.mp3');
            sound2.play();
            blue.style.boxShadow = 'none'; 
            break;
        case 'yellow':
            yellow.style.boxShadow = '5px 10px 20px 10px hsl(0, 73%, 58%)';
            var sound3 = new Audio('./sound/beep3.mp3');
            sound3.play();
            yellow.style.boxShadow = 'none'; 
            break;
        case 'green':
            green.style.boxShadow = '5px 10px 20px 10px hsl(120, 73%, 58%)';
            var sound4 = new Audio('./sound/beep4.mp3');
            sound4.play();
            green.style.boxShadow = 'none'; 
            break;
    }
}