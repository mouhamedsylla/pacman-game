export function boxColliston(div1, div2) {
    const object1 = div1.getBoundingClientRect()
    const object2 = div2.getBoundingClientRect()
    if (object1.x + object1.width > object2.x &&
        object1.x < object2.x + object2.width &&
        object1.y + object1.height > object2.y &&
        object1.y < object2.y + object2.height) {
        return true
    }
    return false 
}



