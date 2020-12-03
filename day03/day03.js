const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(row => row.split(''))

const part1 = (input, slopeX = 3, slopeY = 1) => {
    let nbTreeFound = 0
    let posX = 0
    let posY = 0
    let width = input[0].length
    let height = input.length

    while (posY < height - 1) {
        posY += slopeY
        posX = (posX + slopeX) % width
        if (input[posY][posX] === "#") {
            nbTreeFound++
        }
    }
    return nbTreeFound
}

const part2 = input => {
    let mult1 = part1(input, 1, 1)
    let mult2 = part1(input, 3, 1)
    let mult3 = part1(input, 5, 1)
    let mult4 = part1(input, 7, 1)
    let mult5 = part1(input, 1, 2)
    return mult1 * mult2 * mult3 * mult4 * mult5
}

console.log(part1(input))
console.log(part2(input))