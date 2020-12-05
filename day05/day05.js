const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(codedSeat => {
        return codedSeat.split('').reduce((acc, letter) => {
            if (letter === "F" || letter === "L") return acc + "0"
            else return acc + "1"
        }, "")
    })

const part1 = input => {
    let maxSeat = 0
    for (let boardingPass of input) {
        let seat = parseInt(boardingPass, 2)
        if (seat > maxSeat) maxSeat = seat
    }
    return maxSeat
}

const part2 = input => {
    input = input.map(binarySeat => parseInt(binarySeat, 2))
    input.sort((a, b) => a - b)
    for (let i = 1; i < input.length - 1; i++) {
        if (input[i] + input[i + 1] !== input[i] + input[i] + 1) return input[i] + 1
    }
}

console.log(part1(input))
console.log(part2(input))