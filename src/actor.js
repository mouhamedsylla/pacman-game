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
    this.previous.x = this.position.x;
    this.previous.y = this.position.y;
  }

  goBack() {
    this.position.x = this.previous.x;
    this.position.y = this.previous.y;
  }

  setPlanprevious() {
    this.planPrev.x = this.planMoving.x;
    this.planPrev.y = this.planMoving.y;
  }

  goBackPlan() {
    this.planMoving.x = this.planPrev.x;
    this.planMoving.y = this.planPrev.y;
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
    this.setPlanprevious();
    this.state = this.actor.style.cssText;

    if (this.direction == "ArrowRight" || this.direction == "ArrowLeft") {
      this.position.x += DIRECTION[this.direction].move;
      this.planMoving.x += DIRECTION[this.direction].planMove / 10;
      this.actor.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }

    if (this.direction == "ArrowDown" || this.direction == "ArrowUp") {
      this.position.y += DIRECTION[this.direction].move;
      this.planMoving.y += DIRECTION[this.direction].planMove / 10;
      this.actor.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
    }
  }
}

export default Actor;
