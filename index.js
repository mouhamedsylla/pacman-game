import Board from './src/board.js'
import Pacman from './src/pacman.js'
import { BOARD_MAP, DIRECTION } from './setup.js';


const GAME_BOARD = Board.createBoard(BOARD_MAP)
const PACMAN = Pacman.newPlayer(GAME_BOARD.grid)


document.addEventListener("keydown", ({ key }) => {
    PACMAN.direction = key

    
})


function Animate() {
    PACMAN.move(GAME_BOARD.eat)
    const id = requestAnimationFrame(Animate)
    if (PACMAN.collisionDetect()) {
        cancelAnimationFrame(id)
        Animate()
    }
}

Animate()