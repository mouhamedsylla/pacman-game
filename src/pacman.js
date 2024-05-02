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
			pacman_mouth.style.transform = `rotate(${DIRECTION[this.direction].rotate
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
			pacman_mouth.style.clipPath = `polygon(100% ${variations[this.index][0]
				}%, 44% 48%, 100% ${variations[this.index][1]}%)`;
			this.index == 4 ? (this.index = 0) : this.index++;
			id = requestAnimationFrame(this.animatePacman.bind(this));
		}, 100);
	}




    pacmanEating() {
        const audio = new Audio();
        let vulnerable = false;
        audio.src = AUDIO.chomp;

        const foodElements = document.querySelectorAll('.pacman__food');

        for (let i = 0; i < foodElements.length; i++) {
            const foodElement = foodElements[i];
            if (boxColliston(foodElement, this.actor)) {
                if (foodElement.parentNode.classList.contains("coin")) {
                    this.score += 1000;
                    vulnerable = true;
                } else {
                    this.score += 10;
                }
                const score = document.getElementById("score");
                score.innerText = this.score;
                foodElement.classList.add("anime-food");
                foodElement.remove();
                audio.play();
                break;
            }
        }

        return vulnerable;
    }

	hasWon() {
		return this.board.eat.length === 0;
	}

	static newPlayer() {
		const player = new this();
		return player;
	}
}

export default Pacman;
