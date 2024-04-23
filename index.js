import Board from './src/board.js'
import Pacman from './src/pacman.js'
import Ghosts from './src/ghosts.js';
import { BOARD_MAP, DIRECTION } from './setup.js';


const GAME_BOARD = Board.createBoard(BOARD_MAP)
const PACMAN = Pacman.newPlayer(GAME_BOARD.grid)
const GHOSTS = new Ghosts(GAME_BOARD.grid, GAME_BOARD.ghosts);

//const rect = PACMAN.pacman.getBoundingClientRect()

document.addEventListener("keydown", ({ key }) => {
    
    PACMAN.direction = key

    PACMAN.move(GAME_BOARD.eat)

    // GHOSTS.move

    // GHOSTS.render()
})