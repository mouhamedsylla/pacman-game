class Board {
  constructor(grid) {
    this.main = document.querySelector("main");
    this.grid = [];
    this.eat = [];
    this.ghosts = [];
  }

  build(level) {
    level.forEach((row, rowIndex) => {
      let R = [];
      row.forEach((num, colIndex) => {
        let div = document.createElement("div");
        if (num === 0) {
          div.classList.add("dot");
          div.innerHTML = `<span class="pacman__food"></span>`;
          this.eat.push(div.children);
        } else if (num === 1) {
          div.classList.add("wall");
        } else if (num === 2) {
          div.classList.add("pacman");
          div.innerHTML = `<div class="pacman__mouth"></div>`;
        } else if (num === 3) {
          div.classList.add("ghost");
          div.innerHTML = `
                        <div class="eyes eyeleft"></div>
                        <div class="eyes eyeright"></div>
                    `;
          this.ghosts.push({ x: rowIndex, y: colIndex });
        }
        this.main.appendChild(div);
        R.push(div);
      });
      this.grid.push(R);
    });
  }

  static createBoard(level) {
    const board = new this(level);
    board.build(level);
    return board;
  }
}

export default Board;
