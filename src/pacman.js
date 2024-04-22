import { boxColliston } from './utils/utils.js'
import { DIRECTION } from '../setup.js'

class Pacman {
    constructor(grid) {
        this.grid = grid
        this.position = { x: 1, y: 1 }
        this.previous = { x: 0, y: 0 }
        this.pacman = grid[this.position.x][this.position.y]
        this.direction = null
        this.prev = null
        this.prevDirection = null
    }

    setPrevious() {
        this.previous.x = this.position.x
        this.previous.y = this.position.y
    }

    goBack() {
        this.position.x = this.previous.x
        this.position.y = this.previous.y
    }

    mouthRotate() {
        const pacman_mouth = this.pacman.children[0]
        if (this.direction) { pacman_mouth.style.transform = `rotate(${DIRECTION[this.direction].rotate}deg)` }
    }

    collisionDetect() {
        var result = false
        this.grid.forEach(row => {
            row.forEach(div => {
                if (div.classList.contains("wall") && boxColliston(div, this.pacman)) {
                    result = true
                }
            })
        })
        return result
    }

    eating(eat) {
        for (let i = 0; i < eat.length; i++) {
            const span = eat[i][0]
            if (span && span.parentNode) {
                if (boxColliston(span, this.pacman)) {
                    span.classList.add("anime-food")
                    setTimeout(() => {
                        span.remove()
                    }, 200)
                    break
                }
            }
        }
    }


    move(eat) {
        if (this.collisionDetect()) {
            this.goBack()
            this.pacman.style.cssText = this.prev
            return
        }

        this.setPrevious()
        this.prev = this.pacman.style.cssText
        this.mouthRotate()
        

        if (this.direction == 'ArrowRight' || this.direction == 'ArrowLeft') {
            this.position.x += DIRECTION[this.direction].move
            this.pacman.style.transform = `translate(${this.position.x}px, ${this.position.y - 1 }px)`
        }

        if (this.direction == 'ArrowDown' || this.direction == 'ArrowUp') {
            this.position.y += DIRECTION[this.direction].move
            this.pacman.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
        }
        this.prevDirection = this.direction
        this.eating(eat)
    }
    

    static newPlayer(grid) {
        const player = new this(grid)
        return player
    }
}

export default Pacman