import Actor from "./actor.js";
import { boxCollision } from "./utils/utils.js";
class Ghosts extends Actor {
	constructor(pathImg, position, grid, pos, name) {
		super(position);
		this.name = name
		this.initPosition = null;
		this.pathImg = pathImg;
		this.grid = grid;
		this.planMoving = pos
		this.isVulnerable = false
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
		if (boxCollision(this.actor, pacman)) {
			return true;
		}
		return false;
	}

	beVulnerable() {
		this.isVulnerable = true
		this.actor.innerHTML = ""
		this.actor.innerHTML = `<img class="ghost-img" src="./vulnerable-ghost.png">`
		setTimeout(() => {
			this.actor.innerHTML = ""
			this.actor.innerHTML = `<img class="ghost-img" src="${this.pathImg}">`
			this.isVulnerable = false
		}, 15000)
	}

	static newGhost(pathImg, initPosition, position, grid, pos, name) {
		const g = new this(pathImg, position, grid, pos, name);
		g.createGhost();
		g.initPosition = initPosition;
		return g;
	}
}

export default Ghosts;
