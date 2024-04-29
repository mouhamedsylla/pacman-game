import { game } from "../index.js";

const main = document.querySelector("main")
const body = document.querySelector("body")
const audio = new Audio()
audio.src = "./sound/siren_2.mp3"
const game_component = `
                    <div id="game-stat">
                        <div>score: <span id="score">0</span></div>
                        <div id="timer"></div>
                    </div>
                    <div class="container">
                        <div id="labyrinth"></div>
                        <div id="pause">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div class="stat-text" id="life">
                        life: 
                        <img class="pac-life" src="./icone.png" alt="">
                        <img class="pac-life" src="./icone.png" alt="">
                        <img class="pac-life" src="./icone.png" alt="">
                    </div>
`
// popup message component
const popupMessage = {
    render: function(options, message) {
        const div = document.createElement("div")
        div.classList.add("popup")
        div.textContent = message
        let opts = ""
        options.forEach(element => {
            opts += `<button id="${element}">${element}</button>`
        });
        div.innerHTML = `<div>${message}</div>
                        <div id="options"> ${opts} </div>`
        return div
    }
}
var pause_id = null;
var restart

function options() {
    const pause_btn = document.getElementById("pause")

    // pause click event handler
    pause_btn.addEventListener("click", () => {
        audio.pause()
        pause_id = game.pause();
        pause_btn.setAttribute("id", "replay");
        const popup = popupMessage.render(["continu", "restart"], "PAUSE")
        body.appendChild(popup);
        const continu = document.getElementById("continu")
        restart = document.getElementById("restart")

        // continu click event handler
        continu.addEventListener("click", () => {
            audio.play()
            clearInterval(pause_id);
            popup.remove();
            pause_btn.setAttribute("id", "pause");
        });

        // restart click event handler
        restart.addEventListener("click", () => {
            window.location.reload(false)
        })
    })
}


// game session
function gameSession() {
    const gameOver = game.gameOver
    let id
    if (gameOver) {
        cancelAnimationFrame(id)
        const popup = popupMessage.render(["restart"], "GAME OVER")
        body.appendChild(popup)
        game.pause()
        clearInterval(intervalId)
        restart = document.getElementById("restart")
        restart.addEventListener("click", () => {
            window.location.reload(false)
        })
        audio.pause()
        audio.src = "./sound/death_1.wav"
        audio.loop = false
        audio.play()
        gameOver = false
    }
    id = requestAnimationFrame(gameSession)
}


let remainingSeconds = 3 * 60;
let intervalId

// timer for game session
function timer() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const minutesDisplay = String(minutes).padStart(2, '0');
    const secondsDisplay = String(seconds).padStart(2, '0');

    timerElement.textContent = 'time: ' + minutesDisplay + ':' + secondsDisplay;
    remainingSeconds--;
    if (remainingSeconds < 0) {
        clearInterval(intervalId);
        timerElement.textContent = "GAME OVER";
        gameOver = true
    }
}


function soundPlay() {
    setTimeout(() => {      
        audio.loop = true
        audio.load()
        audio.play()
    }, 4000)
}

play.addEventListener("click", () => {
    main.innerHTML = game_component
    const labyrinth = document.getElementById("labyrinth")
    game.play(labyrinth)
    options()
    gameSession()
    soundPlay()
    if (!intervalId) {
        intervalId = setInterval(timer, 1000);
    }
    
});


