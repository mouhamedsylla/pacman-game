import Board from './src/board.js'
import Pacman from './src/pacman.js'
import Game from './src/game.js'

const GAME_BOARD = Board.newBoard()
const PACMAN = Pacman.newPlayer()
const game = Game.newGame(GAME_BOARD, PACMAN)
export { game }
