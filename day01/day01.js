const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(stringNumber => parseInt(stringNumber))
    // .sort((a, b) => a - b)

const part1 = input => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (i !== j) {
                if (input[i] + input[j] === 2020) {
                    return input[i] * input[j]
                }
            }
        }
    }
}

const part2 = input => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < input.length; k++) {
                if (i !== j && i !== k && j !== k) {
                    if (input[i] + input[j] + input[k] === 2020) {
                        return input[i] * input[j] * input[k]
                    }
                }
            }
        }
    }
}

console.log(part1(input))
console.log(part2(input))