class App {
    constructor() {
        this.startGameButton = document.getElementById("start");
    }

    startGame() {
        this.startGameButton.onclick = function(){
            let game = new Game(3, 30);
            game.contDownTimer();
            game.moveFly();
            game.flies.forEach(fly => {
                fly.ChangeDisplay();
            });
        }
    }
}

class Fly {
    constructor(){
        this.scoreValue = 1;
        this.position = this.changeDirection();
        this.display = "none";
        this.init();
    }

    init() {
        let div = document.createElement("div");
        div.className = "fly";
        div.id = "fly";
        document.body.appendChild(div);
    }

    ChangeDisplay() {
        if (this.display === "none") {
            this.display = "block";
        } else {         
            this.display = "none";
        }
    }

    changePosition() {
        let position;
        for (let i = 0; i < document.getElementsByClassName('fly').length; i++) {
            document.getElementsByClassName('fly')[i].style.left = Math.random() * (window.innerWidth - 32) + "px";
            document.getElementsByClassName('fly')[i].style.top = Math.random() * (window.innerHeight - 32) + "px";
        }
        return position;
    }

    changeDirection() {
        let direction;
        let position;

        return position;
    }

    hitFly(){
        
    }

}

class Game {
    constructor(flyNumber, timer){
        this.flyNumber = flyNumber;
        this.timer = Number(timer);
        this.score = 0;
        this.flies = this.createFly();
        this.idTimeout;
    }

    createFly(){
        let flies = [];
        for (let i = 0; i < this.flyNumber; i++) {
            let fly = new Fly();
            flies.push(fly);
        }
        return flies;
    }

    getScore(){
        return this.score;
    }

    contDownTimer(){
        let time = document.getElementById('timer');
        time.innerHTML = this.timer;
        let timer = setInterval(function () {
            time.innerHTML = time.innerHTML - 1;
            if (Number(time.innerHTML) == 0) {
                for (let i = 0; i < this.flies.length; i++) {
                    this.flies[i].display = "none";
                }
                time.innerHTML = 30;
                clearInterval(timer);  
            }
        }, 100);
    }
    
    moveFly() {
        changePosition();
        this.idTimeout = setTimeout(moveFly, 1500);
        return this.idTimeout;
    }
}


var idTimeout;
function initialization() {
    let button = document.getElementById("start");
    const flyNumber = 3;
    for (let i = 0; i < flyNumber; i++) {
        let fly = document.createElement("div");
        fly.className = "fly";
        fly.id = "fly";
        document.body.appendChild(fly);
    }
    let flies = document.getElementsByClassName("fly");

    button.onclick = function () {
        // 1.C : Reset the score
        document.getElementById('score').innerText = 0;
        idTimeout = moveFly();
        //document.getElementById('fly').style.display = "block";
        for (let i = 0; i < flyNumber; i++) {
            document.getElementsByClassName('fly')[i].style.display = "block";
        }

        // 1.a : Cont down the time.
        let time = document.getElementById('timer');
        time.innerHTML = 30;
        let timer = setInterval(function () {
            time.innerHTML = time.innerHTML - 1;
            if (time.innerHTML == 0) {
                for (let i = 0; i < flyNumber; i++) {
                    document.getElementsByClassName('fly')[i].style.display = "none";
                }
                time.innerHTML = 30;
                clearTimeout(idTimeout);
                clearInterval(timer);     
            }
        }, 1000);
    }

    for(let i = 0; i < flies.length; i++){
        flies[i].addEventListener("click", function () {
            document.getElementById('score').innerText = parseInt(document.getElementById('score').innerText) + 1;
            // 1.D : My solution to avoid people clicking on the fly more than 1 time per position, it changes its position ^^.
            clearInterval(idTimeout);
            idTimeout = moveFly();
        });
    }
}

function moveFly() {
    changePosition();
    idTimeout = setTimeout(moveFly, 1500);
    return idTimeout;
}

function changePosition() {
    for (let i = 0; i < document.getElementsByClassName('fly').length; i++) {
        document.getElementsByClassName('fly')[i].style.left = Math.random() * (window.innerWidth - 32) + "px";
        document.getElementsByClassName('fly')[i].style.top = Math.random() * (window.innerHeight - 32) + "px";
    }
}

window.onload = initialization;
// window.onload = function () {
//     let app = new App();
//     app.startGame();

// }