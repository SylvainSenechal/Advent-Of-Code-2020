const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(row => row.split(''))

const part1 = input => {
    let width = input[0].length
    let height = input.length 
    let identical = false

    while (!identical) {
        let copyInput = input.map(elem => [...elem])
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                let nbAdjacent = 0
                if (w < width - 1) {
                    if (input[h + 0][w + 1] === "#") nbAdjacent++
                    if (h < height - 1) {
                        if (input[h + 1][w + 1] === "#") nbAdjacent++
                    }
                }
                if (h < height - 1) {
                    if (input[h + 1][w + 0] === "#") nbAdjacent++
                    if (w > 0) {
                        if (input[h + 1][w - 1] === "#") nbAdjacent++
                    }
                }
                if (w > 0) {
                    if (input[h + 0][w - 1] === "#") nbAdjacent++
                    if (h > 0) {
                        if (input[h - 1][w - 1] === "#") nbAdjacent++
                    }
                }
                if (h > 0) {
                    if (input[h - 1][w + 0] === "#") nbAdjacent++
                    if (w < width - 1) {
                        if (input[h - 1][w + 1] === "#") nbAdjacent++
                    }
                }

                if (input[h][w] === "L" && nbAdjacent === 0) copyInput[h][w] = "#"
                if (input[h][w] === "#" && nbAdjacent >= 4) copyInput[h][w] = "L"
            }
        }
                   
        identical = true
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                if (input[h][w] !== copyInput[h][w]) identical = false
            }
        }
        input = copyInput
    }

    let nbOccupied = 0
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (input[h][w] === "#") nbOccupied++
        }
    }
    return nbOccupied
}

console.log(part1(input))
// console.log(part2(input))