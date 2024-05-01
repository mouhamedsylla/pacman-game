import { BOARD_MAP, GHOSTS } from "../setup.js"
import Ghosts from "./ghosts.js"
import { delimiteSector, collisionDetect, resetPacman, resetGhost } from "./utils/utils.js"

class Game {
	constructor(board, pacman) {
		this.board = board
		this.pacman = pacman
		this.ghosts = []
		this.gameOver = false
		this.lives = 3
		this.animateGhost = this.animateGhost.bind(this)
	}

	generateRandomDirection(ghost) {
		setInterval(() => {
			ghost.direction = ghost.randomDirection()
		}, 2000)
	}

	animateGhost(ghost) {
		const animate = () => {
			let id
			ghost.move()
			if (ghost.crossPacman(this.pacman.actor)) {
				// Reset Pac-Man and Ghosts position
				let i = 0
				resetPacman(this.pacman)
				Object.entries(GHOSTS).forEach(([key, value]) => {
					const newVal = JSON.parse(JSON.stringify(value))
					resetGhost(this.ghosts[i], newVal.position, newVal.plan)
					i++
				})
				this.lives -= 1
				this.lives == 0 ? this.gameOver = true : this.updateLivesDisplay()
			}
			const divs = delimiteSector(
				ghost.grid,
				Math.trunc(ghost.planMoving.x),
				Math.trunc(ghost.planMoving.y)
			)
			const collisionDetected = collisionDetect(divs, ghost.actor)
			if (collisionDetected) {
				cancelAnimationFrame(id)
				ghost.direction = ghost.randomDirection()
			}
			if (
				!collisionDetected ||
				(collisionDetected && ghost.direction !== null)
			) {
				id = requestAnimationFrame(animate)
			}
		}
		animate()
	}

	play(main) {
		// build game board and add pacman
		this.board.setMain(main)
		this.board.build(BOARD_MAP)
		const audio = new Audio()
		audio.src = "../assets/sound/Intro.mp3"
		audio.play()
		setTimeout(() => {
			// Set moving pacman
			const initialPosition = { x: 1, y: 1 }
			this.pacman.setActor(this.board.grid, initialPosition)
			this.pacman.animatePacman()
			document.addEventListener("keydown", ({ key }) => {
				this.pacman.direction = key
				this.pacman.mouthRotate()
				this.pacman.move()
				this.pacman.eating(this.board.eat)
			})

			// Add and set ghosts moving
			Object.entries(GHOSTS).forEach(([key, value]) => {
				const initVal = JSON.parse(JSON.stringify(value))
				const newGhost = Ghosts.newGhost(
					initVal.imgPath,
					initVal.initPosition,
					initVal.position,
					this.board.grid,
					initVal.plan
				)
				this.ghosts.push(newGhost)
				this.board.addGhost(newGhost)
			})

			this.ghosts.forEach(this.generateRandomDirection)
			this.ghosts.forEach((ghost) => this.animateGhost(ghost))
		}, 4000)
	}

	pause() {
		const id = setInterval(() => {
			this.pacman.direction = null
			this.ghosts.forEach((ghost) => {
				ghost.direction = null
			})
		}, 1)
		return id
	}

	updateLivesDisplay() {
		const livesDisplay = document.getElementById("life")
		livesDisplay.innerHTML = "life: "
		for (let i = 0; i < this.lives; i++) {
		  livesDisplay.innerHTML += `<img class="pac-life" src="./icone.png" alt="">`
		}
	  }

	static newGame(board, pacman) {
		const game = new this(board, pacman)
		return game
	}
}

export default Game
