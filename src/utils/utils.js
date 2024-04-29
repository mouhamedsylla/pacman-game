export function delimiteSector(grid, x, y) {
    const backX = x-1 >= 0 ? x-1 : 0
    const backY = y-1 >= 0 ? y-1 : 0
    return [
      grid[y][backX], grid[y][x+1], 
      grid[backY][x], grid[y+1][x], grid[y][x], 
      grid[backY][x+1], grid[backY][backX], 
      grid[y+1][x+1], grid[y+1][backX]
    ]
  } 
  
  export function boxColliston(div1, div2) {
    const object1 = div1.getBoundingClientRect();
    const object2 = div2.getBoundingClientRect();
    if (
      object1.x + object1.width > object2.x &&
      object1.x < object2.x + object2.width &&
      object1.y + object1.height > object2.y &&
      object1.y < object2.y + object2.height
    ) {
      return true;
    }
    return false;
  }
  
  export function collisionDetect(grid, actor) {
    var result = false;
    grid.forEach(div => {
        if (div.classList.contains("wall") && boxColliston(div, actor)) {
          result = true;
        }
    });
    return result;
  }
  
  export function DivIn(grid, div) {
    const start = grid[13][13].getBoundingClientRect().x;
    const end = grid[13][15].getBoundingClientRect().x;
    const rect = div.getBoundingClientRect();
    if (rect.x >= start && rect.x <= end) {
      return true;
    }
    return false;
  }
  