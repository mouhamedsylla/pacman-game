class Ghosts {
  constructor(grid, ghosts) {
    this.grid = grid;
    this.ghosts = ghosts;
  }

  move() {
    // Implement ghost movement logic here
    // For now, let's make them move randomly
    this.ghosts.forEach((ghost, index) => {
      const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      this.ghosts[index] = this.moveGhost(ghost, randomDirection);
    });
  }

  moveGhost(ghost, direction) {
    const { x, y } = ghost;
    const nextX = x + DIRECTION[direction].move;
    const nextY = y + DIRECTION[direction].move;
    // Check if the next position is a valid move
    if (
      this.grid[nextX] &&
      this.grid[nextX][nextY] &&
      !this.grid[nextX][nextY].classList.contains("wall")
    ) {
      return { x: nextX, y: nextY };
    }
    return ghost; // If the move is not valid, return current position
  }

  render() {
    this.ghosts.forEach((ghost, index) => {
      const ghostElement = this.grid[ghost.x][ghost.y];
      ghostElement.style.transform = `translate(${ghost.y * 20}px, ${
        ghost.x * 20
      }px)`; // Assuming each grid cell is 20px
    });
  }
}

export default Ghosts;
