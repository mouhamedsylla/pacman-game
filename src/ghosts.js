import Actor from "./actor.js";
import { boxColliston } from "./utils/utils.js";
class Ghosts extends Actor {
  constructor(pathImg, position, grid, pos) {
    super(position);
    this.initPosition = null;
    this.pathImg = pathImg;
    this.grid = grid;
    this.planMoving = pos;
  }

  createGhost() {
    this.actor = `<img class="ghost-img" src="${this.pathImg}">`;
  }

  setGhost(div) {
    this.actor = div;
  }

  randomDirection() {
    const directions = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    const randomDirection = directions[randomIndex];
    return randomDirection;
  }

  crossPacman(pacman) {
    if (boxColliston(this.actor, pacman)) {
      return true;
    }
    return false;
  }

  static newGhost(pathImg, initPosition, position, grid, pos) {
    const g = new this(pathImg, position, grid, pos);
    g.createGhost();
    g.initPosition = initPosition;
    return g;
  }
}

export default Ghosts;
