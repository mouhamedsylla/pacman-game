import { DIRECTION } from "../setup.js";
import { collisionDetect, delimiteSector } from "./utils/utils.js";

class Actor {
	constructor(position) {
		this.state;
		this.direction;
		this.actor = null;
		this.previous = { x: 0, y: 0 };
		this.position = position;
		this.planMoving = { x: 1, y: 1 };
		this.planPrev = { x: 0, y: 0 };
	}

	setPrevious() {
		const { x, y } = this.position;
		this.previous = { x, y };
	}

	goBack() {
		const { x, y } = this.previous;
		this.position = { x, y };
	}

	setPlanPrevious() {
		const { x, y } = this.planMoving;
		this.planPrev = { x, y };
	}

	goBackPlan() {
		const { x, y } = this.planPrev;
		this.planMoving = { x, y };
	}

	move() {
		if (
			collisionDetect(
				delimiteSector(
					this.grid,
					Math.trunc(this.planMoving.x),
					Math.trunc(this.planMoving.y)
				),
				this.actor
			)
		) {
			this.goBack();
			this.goBackPlan();
			this.actor.style.cssText = this.state;
			return;
		}

		this.setPrevious();
		this.setPlanPrevious();
		this.state = this.actor.style.cssText;

		if (this.direction == "ArrowRight" || this.direction == "ArrowLeft") {
			this.position.x += DIRECTION[this.direction].move;
			this.planMoving.x += DIRECTION[this.direction].planMove / 10;	
		}

		if (this.direction == "ArrowDown" || this.direction == "ArrowUp") {
			this.position.y += DIRECTION[this.direction].move;
			this.planMoving.y += DIRECTION[this.direction].planMove / 10;
		}
		this.actor.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
	}
}

export default Actor;
