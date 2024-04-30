import Actor from "./actor.js";
import { boxColliston } from "./utils/utils.js";
import { DIRECTION } from "../setup.js";
class Pacman extends Actor {
  constructor() {
    super({ x: 1, y: 1 });
    this.grid = null;
    this.score = 0;
    this.index = 0;
    this.gameOver = false;
    this.lives = 3;
  }

  setActor(grid, initialPosition) {
    this.grid = grid;
    this.position = initialPosition;
    this.actor = this.grid[this.position.x][this.position.y];
  }

  mouthRotate() {
    const pacman_mouth = this.actor.children[0];
    if (this.direction) {
      pacman_mouth.style.transform = `rotate(${
        DIRECTION[this.direction].rotate
      }deg)`;
    }
  }

  animatePacman() {
    const pacman_mouth = document.getElementById("mouth");
    const variations = [
      [74, 21],
      [60, 40],
      [50, 50],
      [59, 35],
      [74, 21],
    ];
    let id;

    const t = setTimeout(() => {
      if (this.gameOver) {
        cancelAnimationFrame(id);
        clearTimeout(t);
      }
      pacman_mouth.style.clipPath = `polygon(100% ${
        variations[this.index][0]
      }%, 44% 48%, 100% ${variations[this.index][1]}%)`;
      this.index == 4 ? (this.index = 0) : this.index++;
      id = requestAnimationFrame(this.animatePacman.bind(this));

      // Update the lives display
      this.updateLivesDisplay();
    }, 100);
  }

  updateLivesDisplay() {
    const livesDisplay = document.getElementById("life");
    livesDisplay.innerHTML = "life: ";
    for (let i = 0; i < this.lives; i++) {
      livesDisplay.innerHTML += `<img class="pac-life" src="./icone.png" alt="">`;
    }
  }

  eating(eat) {
    const audio = new Audio();
    audio.src = "../assets/sound/credit.wav";
    for (let i = 0; i < eat.length; i++) {
      const span = eat[i][0];
      if (span && span.parentNode) {
        if (boxColliston(span, this.actor)) {
          this.score += 10;
          const score = document.getElementById("score");
          score.innerText = this.score;
          span.classList.add("anime-food");
          span.remove();
          audio.play();
          break;
        }
      }
    }
  }

  static newPlayer() {
    const player = new this();
    return player;
  }
}

export default Pacman;
