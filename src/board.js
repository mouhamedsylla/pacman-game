class Board {
    constructor(grid) {
        this.main = document.querySelector("main")
        this.grid = []
        this.eat = []
    }

    build(level) {
        level.forEach(row => {
            let R = []
            row.forEach(num => {
                let div = document.createElement("div")
                num == 0 ? div.classList.add("dot") : div.classList.add("wall")
                if (num == 2) { 
                    div.classList = []
                    div.classList.add("pacman")
                    div.innerHTML = `
                    <div class="pacman__mouth"></div>
                    `
                }
                R.push(div)
                if (div.classList.contains("dot")) {
                    div.innerHTML = `<span class="pacman__food"></span>`
                    this.eat.push(div.children)
                }
                this.main.appendChild(div)
            })
            this.grid.push(R)
        });
    }

    static createBoard(level) {
            const board = new this(level)
            board.build(level)
            return board
        }
}

export default Board