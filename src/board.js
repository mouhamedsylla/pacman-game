class Board {
    constructor() {
        this.main = null
        this.grid = []
        this.eat = []
    }

    setMain(main) {
        this.main = main
    }

    build(level) {
        let cpt = 0;
        level.forEach(row => {
            let R = row.map(num => {
                const div = document.createElement("div");
                div.setAttribute("id", cpt++);
                switch (num) {
                    case 0:
                        div.classList.add("dot");
                        div.innerHTML = `<span class="pacman__food"></span>`;
                        this.eat.push(div.children);
                        break;
                    case 2:
                        div.classList.add("pacman");
                        div.innerHTML = `<div class="pacman__mouth" id="mouth"></div>`;
                        break;
                    case 3:
                        div.classList.add("coin");
                        div.innerHTML = `<span class="pacman__food"></span>`;
                        this.eat.push(div.children);
                        break;
                    default:
                        div.classList.add("wall");
                }
                return div;
            });
            this.grid.push(R);
            R.forEach(div => this.main.appendChild(div));
        });
    }


    addGhost(...ghosts) {
        ghosts.forEach(ghost => {
            const div = document.getElementById(ghost.initPosition)
            div.classList.replace("dot", "ghost")
            div.innerHTML = ghost.actor
            ghost.grid = this.grid
            ghost.setGhost(div)
        })
    }

    static newBoard() {
        const board = new this()
        return board
    }
}

export default Board