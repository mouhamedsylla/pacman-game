import { BOARD_MAP, GHOSTS, TIMER, AUDIO } from "../setup.js"
import Ghosts from "./ghosts.js"
import { delimiteSector, collisionDetect, resetPacman, resetGhost } from "./utils/utils.js"


class Game {
	constructor(board, pacman) {
		this.board = board
		this.pacman = pacman
		this.ghosts = []
		this.lives = 3
		this.pauseId = null
		this.gameOver = false
		this.won = false
		this.timerElement = null
		this.vulnerable = false
		this.audio = { background: new Audio(), event: new Audio()}
		this.timer = JSON.parse(JSON.stringify(TIMER))
	}

	generateRandomDirection(ghost) {
		setInterval(() => {
			ghost.direction = ghost.randomDirection()
		}, 2000)
	}

	animeGhosts(ghost) {
		const animate = () => {
			let id
			ghost.move()
			if (ghost.crossPacman(this.pacman.actor)) {
				this.audio.event.src = AUDIO.death
				this.audio.event.play()
				if (ghost.isVulnerable) {
					clearTimeout(ghost.idVulnerable)
					const newVal = JSON.parse(JSON.stringify(GHOSTS[ghost.name]))
					ghost.actor.innerHTML = `<img class="ghost-img" src="${ghost.pathImg}">`
					resetGhost(ghost, newVal.position, newVal.plan)
				} else {
					// Reset Pac-Man and Ghosts position
					let i = 0
					this.audio.background.pause()
					resetPacman(this.pacman)
					Object.entries(GHOSTS).forEach(([key, value]) => {
						const newVal = JSON.parse(JSON.stringify(value))
						resetGhost(this.ghosts[i], newVal.position, newVal.plan)
						i++
					})
					
					this.lives -= 1		
					this.lives < 0 ? this.gameOver = true : this.updateLivesDisplay()
					if (!this.gameOver) {
						this.pauseGame()
						setTimeout(() => {
							this.resumeGame()
							this.audio.background.play()
						}, 2000)
					}
				}
			}
			
			const divs = delimiteSector(ghost.grid, Math.trunc(ghost.planMoving.x),Math.trunc(ghost.planMoving.y))
			const collisionDetected = collisionDetect(divs, ghost.actor)

			if (collisionDetected) {
				cancelAnimationFrame(id)
				ghost.direction = ghost.randomDirection()
			}

			if (this.vulnerable) { ghost.beVulnerable() }
			if (!collisionDetected || (collisionDetected && ghost.direction !== null)) {
				id = requestAnimationFrame(animate)
			}
		}
		animate()
	}

	play(main) {
		this.board.setMain(main)
		this.board.build(BOARD_MAP)
		this.audio.event.src = AUDIO.intro
		this.audio.background.src = AUDIO.siren
		this.audio.event.play()
		setTimeout(() => {
			this.pacman.setActor(this.board.grid)
			this.pacman.animatePacman()
			document.addEventListener("keydown", ({ key }) => {
				this.pacman.direction = this.timer.isPaused == true ? "" : key
				this.pacman.mouthRotate()
				this.pacman.move()
				if (this.pacman.hasWon(this.board.eat)) { this.won = true }
				this.vulnerable = this.pacman.pacmanEating(this.board.eat)
			})

			Object.entries(GHOSTS).forEach(([key, value]) => {
				const initVal = JSON.parse(JSON.stringify(value))
				const newGhost = Ghosts.newGhost(
					initVal.imgPath,
					initVal.initPosition,
					initVal.position,
					this.board.grid,
					initVal.plan,
					key
				)
				this.ghosts.push(newGhost)
				this.board.addGhost(newGhost)
			})
			this.ghosts.forEach(this.generateRandomDirection)
			this.ghosts.forEach((ghost) => this.animeGhosts(ghost))
			this.startTimer()
		}, 4000)
	}

	startTimer() {
        this.timer.intervalId = setInterval(() => {
            if (!this.timer.isPaused) {
				this.displayTime()
				this.timer.remainingSeconds--

				if (this.timer.remainingSeconds <= 0) {
                    this.gameOver = true
                }
			}
        }, 1000);
    }

	pauseGame() {
		this.timer.isPaused = true
        clearInterval(this.timer.intervalId)
		this.pauseId = setInterval(() => {
			this.pacman.direction = null
			this.ghosts.forEach((ghost) => {
				ghost.direction = null
			})
		}, 1)
	}

	resumeGame() {
		this.timer.isPaused = false
		clearInterval(this.pauseId)
		this.timer.intervalId = setInterval(() => {
            if (!this.timer.isPaused) {
                this.timer.remainingSeconds--;
				this.displayTime()

                if (this.timer.remainingSeconds <= 0) {
                    this.gameOver = true
                }
            }
        }, 1000) 
	}

	updateLivesDisplay() {
		const livesDisplay = document.getElementById("life")
		livesDisplay.innerHTML = "life: "
		for (let i = 0; i < this.lives; i++) {
		  livesDisplay.innerHTML += `<img class="pac-life" src="./icone.png" alt="">`
		}
	}

	displayTime() {
		const minutes = Math.floor(this.timer.remainingSeconds / 60);
		const seconds = this.timer.remainingSeconds % 60;
	
		const minutesDisplay = String(minutes).padStart(2, '0')
		const secondsDisplay = String(seconds).padStart(2, '0')
		this.timerElement.textContent = 'time: ' + minutesDisplay + ':' + secondsDisplay
	}

	static newGame(board, pacman) {
		const game = new this(board, pacman)
		return game
	}
}

export default Game