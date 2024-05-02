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



	eating(eat) {
		const audio = new Audio();
		audio.src = AUDIO.chomp
		for (let i = 0; i < eat.length; i++) {
			const span = eat[i][0];
			if (span && span.parentNode) {
				if (boxColliston(span, this.actor)) {
					if (span.parentNode.classList.contains("coin")) {
						this.score += 1000
						//audio.src =
					} else {
						this.score += 10
					}
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
