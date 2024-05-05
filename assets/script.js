import { game } from "../index.js";

const main = document.querySelector("main");
const body = document.querySelector("body");

// game party component
const game_component = `
                    <header>
                        <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/a/a2/Pac-Man_Logo.svg/langfr-1920px-Pac-Man_Logo.svg.png" 
                        alt="Logo Pac-Man" id="logo" />
                    </header>
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
`;

// popup message component
const popupMessage = {
	render: function (options, message) {
		const div = document.createElement("div");
		div.classList.add("popup");
		div.textContent = message;
		let opts = "";
		options.forEach((element) => {
			opts += `<button id="${element}">${element}</button>`;
		});
		div.innerHTML = `<div>${message}</div>
                        <div id="options"> ${opts} </div>`;
		return div;
	},
};

let gameSessionId;
let pause_btn;
let restart;

function handlePauseRestart() {
	pause_btn = document.getElementById("pause");

	// pause click event handler
	game.audio.background.pause();
	game.pauseGame();
	pause_btn.setAttribute("id", "replay");
	const popup = popupMessage.render(["continu", "restart"], "PAUSE");
	body.appendChild(popup);
	const continu = document.getElementById("continu");
	restart = document.getElementById("restart");
	pause_btn.removeEventListener("click", handlePauseRestart)

	// continu click event handler
	continu.addEventListener("click", () => {
		pause_btn.addEventListener("click", handlePauseRestart)
		game.audio.background.play();
		game.resumeGame();
		popup.remove();
		pause_btn.setAttribute("id", "pause");
	});

	// restart click event handler
	restart.addEventListener("click", () => {
		window.location.reload(false);
	});
}


function gameSession() {
	if (game.gameOver || game.won) {
		cancelAnimationFrame(gameSessionId);
		game.pauseGame();
		pause_btn.removeEventListener("click", handlePauseRestart)
		const popup = game.won != true ? popupMessage.render(["restart"], "GAME OVER") : popupMessage.render(["restart"], "YOU WIN")
		body.appendChild(popup);
		restart = document.getElementById("restart");
		restart.addEventListener("click", () => {
			window.location.reload(false);
		});
		game.audio.background.pause();
		game.audio.event.play();
	} else {
		gameSessionId = requestAnimationFrame(gameSession);
	}
}

function soundPlay() {
	setTimeout(() => {
		game.audio.background.loop = true;
		game.audio.background.load();
		game.audio.background.play();
	}, 4000);
}

function initGame() {
	main.innerHTML = game_component
	const labyrinth = document.getElementById("labyrinth")
	pause_btn = document.getElementById("pause");
	game.timerElement = document.getElementById('timer')
	pause_btn.addEventListener("click", handlePauseRestart)
	game.play(labyrinth)
	gameSession()
	soundPlay()
}

play.addEventListener("click", initGame);
