import Actor from "./actor.js";
import { boxColliston } from "./utils/utils.js";
import { DIRECTION, AUDIO } from "../setup.js";
class Pacman extends Actor {
  constructor() {
    super({ x: 1, y: 1 });
    this.grid = null;
    this.score = 0;
    this.index = 0;
    this.gameOver = false;
  }

  setActor(grid) {
    this.grid = grid;
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
    }, 100);
  }

  pacmanEating(eat) {
    const audio = new Audio();
    let vulnerable = false;
    audio.src = AUDIO.chomp;

    for (let i = 0; i < eat.length; i++) {
      const htmlCollection = eat[i];
      for (let j = 0; j < htmlCollection.length; j++) {
        const span = htmlCollection[j];
        if (span && span.parentNode) {
          if (boxColliston(span, this.actor)) {
            if (span.parentNode.classList.contains("coin")) {
              this.score += 1000;
              vulnerable = true;
            } else {
              this.score += 10;
            }
            const score = document.getElementById("score");
            score.innerText = this.score;
            span.classList.add("anime-food");
            span.remove();
            htmlCollection.splice(j, 1);
            j--;
            audio.play();
            break;
          }
        }
      }
    }

    return vulnerable;
  }

  hasWon(eat) {
    for (let i = 0; i < eat.length; i++) {
      const htmlCollection = eat[i];
      if (htmlCollection.length > 0) {
        return false;
      }
    }
    return true;
  }

  static newPlayer() {
    const player = new this();
    return player;
  }
}

export default Pacman;
