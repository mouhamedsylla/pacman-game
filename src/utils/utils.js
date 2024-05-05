export function delimiteSector(grid, x, y) {
	const backX = x - 1 >= 0 ? x - 1 : 0
	const backY = y - 1 >= 0 ? y - 1 : 0
	return [
		grid[y][backX], grid[y][x + 1],
		grid[backY][x], grid[y + 1][x], grid[y][x],
		grid[backY][x + 1], grid[backY][backX],
		grid[y + 1][x + 1], grid[y + 1][backX]
	]
}

export function boxCollision(div1, div2) {
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
		if (div.classList.contains("wall") && boxCollision(div, actor)) {
			result = true;
		}
	});
	return result;
}

export function resetPacman(pacman) {
	pacman.position = { x: 1, y: 1 }
	pacman.planMoving = { x: 1, y: 1 }
	pacman.actor.style.transform = `translate(${pacman.position.x}px, ${pacman.position.y}px)`
}

export function resetGhost(ghost, position, planMoving) {
	ghost.position = position
	ghost.planMoving = planMoving
	ghost.actor.style.transform = `translate(${ghost.position.x}px, ${ghost.position.y}px)`
	ghost.actor.innerHTML = `<img class="ghost-img" src="${ghost.pathImg}">`
}
