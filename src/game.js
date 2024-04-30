import { BOARD_MAP, GHOSTS } from "../setup.js";
import Ghosts from "./ghosts.js";
import { delimiteSector, collisionDetect } from "./utils/utils.js";

class Game {
  constructor(board, pacman) {
    this.board = board;
    this.pacman = pacman;
    this.ghosts = [];
    this.gameOver = false;
    this.animateGhost = this.animateGhost.bind(this);
  }

  generateRandomDirection(ghost) {
    setInterval(() => {
      ghost.direction = ghost.randomDirection();
    }, 2000);
  }

  animateGhost(ghost) {
    const animate = () => {
      let id;
      ghost.move();
      if (ghost.crossPacman(this.pacman.actor)) {
        this.pacman.lives--;
        if (this.pacman.lives === 0) {
          this.gameOver = true;
          this.pacman.gameOver = true;
          cancelAnimationFrame(id);
          // this.pacman.actor.style.display = 'none';
        } else {
          // Reset Pac-Man's position and actor
          const initialPosition = { x: 1, y: 1 };
          this.pacman.position = initialPosition;
          this.pacman.planMoving = { x: 1, y: 1 };
          this.pacman.setActor(this.board.grid, initialPosition);
          this.pacman.actor.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
        }
      }
      const divs = delimiteSector(
        ghost.grid,
        Math.trunc(ghost.planMoving.x),
        Math.trunc(ghost.planMoving.y)
      );
      const collisionDetected = collisionDetect(divs, ghost.actor);
      if (collisionDetected) {
        cancelAnimationFrame(id);
        ghost.direction = ghost.randomDirection();
      }
      if (
        !collisionDetected ||
        (collisionDetected && ghost.direction !== null)
      ) {
        id = requestAnimationFrame(animate);
      }
    };
    animate();
  }

  play(main) {
    // build game board and add pacman
    // this.style.imgPath.src = "https://upload.wikimedia.org/wikipedia/fr/thumb/a/a2/Pac-Man_Logo.svg/langfr-1920px-Pac-Man_Logo.svg.png"

    this.board.setMain(main);
    this.board.build(BOARD_MAP);
    const audio = new Audio();
    audio.src = "../assets/sound/Intro.mp3";
    audio.play();
    setTimeout(() => {
      // Set moving pacman
      const initialPosition = { x: 1, y: 1 };
      this.pacman.setActor(this.board.grid, initialPosition);
      this.pacman.animatePacman();
      document.addEventListener("keydown", ({ key }) => {
        this.pacman.direction = key;
        this.pacman.mouthRotate();
        this.pacman.move();
        this.pacman.eating(this.board.eat);
      });

      // Add and set ghosts moving
      Object.entries(GHOSTS).forEach(([key, value]) => {
        const newGhost = Ghosts.newGhost(
          value.imgPath,
          value.initPosition,
          value.position,
          this.board.grid,
          value.plan
        );
        this.ghosts.push(newGhost);
        this.board.addGhost(newGhost);
      });

      this.ghosts.forEach(this.generateRandomDirection);
      this.ghosts.forEach((ghost) => this.animateGhost(ghost));
    }, 4000);
  }

  pause() {
    const id = setInterval(() => {
      this.pacman.direction = null;
      this.ghosts.forEach((ghost) => {
        ghost.direction = null;
      });
    }, 1);
    return id;
  }

  static newGame(board, pacman) {
    const game = new this(board, pacman);
    return game;
  }
}

export default Game;
