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
      let cpt = 0
      level.forEach(row => {
          let R = []
          row.forEach(num => {
              let div = document.createElement("div")
            num == 0 ? div.classList.add("dot") : div.classList.add("wall")
            if (num == 2) { 
                div.classList = []
                div.classList.add("pacman")
                div.innerHTML = `
                    <div class="pacman__mouth" id="mouth"></div>
                `
            }
            // if (num == 3) {
            //     div.classList = []
            //     div.classList.add("coin")
            //     div.innerHTML = `
            //         <div class="coins" id="id_coin"></div>
            //     `
            // }
            R.push(div)
            if (div.classList.contains("dot")) {
                div.innerHTML = `<span class="pacman__food"></span>`
                this.eat.push(div.children)
            }
            div.setAttribute("id", cpt)
            cpt++
            this.main.appendChild(div)
        })
        this.grid.push(R)
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