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

var gameOver;
var gameSessionId;
var restart;

function gameHandler() {
  const pause_btn = document.getElementById("pause");

  // pause click event handler
  pause_btn.addEventListener("click", () => {
    game.audio.background.pause();
    game.pauseGame();
    pause_btn.setAttribute("id", "replay");
    const popup = popupMessage.render(["continue", "restart"], "PAUSE");
    body.appendChild(popup);
    const continu = document.getElementById("continue");
    restart = document.getElementById("restart");

    // continu click event handler
    continu.addEventListener("click", () => {
      game.audio.background.play();
      game.resumeGame();
      popup.remove();
      pause_btn.setAttribute("id", "pause");
    });

    // restart click event handler
    restart.addEventListener("click", () => {
      window.location.reload(false);
    });
  });
}

function gameSession() {
  if (game.gameOver) {
    cancelAnimationFrame(gameSessionId);
    game.pauseGame();
    const popup = popupMessage.render(["restart"], "GAME OVER");
    body.appendChild(popup);
    restart = document.getElementById("restart");
    restart.addEventListener("click", () => {
      window.location.reload(false);
    });
    game.audio.background.pause();
    game.audio.event.play();
    gameOver = false;
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

play.addEventListener("click", () => {
  main.innerHTML = game_component;
  const labyrinth = document.getElementById("labyrinth");
  game.timerElement = document.getElementById("timer");
  game.play(labyrinth);
  gameHandler();
  gameSession();
  soundPlay();
});
