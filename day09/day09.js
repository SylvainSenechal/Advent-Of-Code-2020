const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(stringNumber => parseInt(stringNumber))

const part1 = input => {
    for (let i = 25; i < input.length - 1; i++) {
        let sumLast = new Set()
        for (let m = 0; m < 25; m++) {
            for (let n = 0; n < 25; n++) {
                if (m !== n) {
                    sumLast.add(input[m + i - 25] + input[n + i - 25])
                }
            }
        }
        if (!sumLast.has(input[i])) {
            return input[i]
        }
    }
}

const part2 = input => {
    let target = part1(input)
    for (let start = 0; start < input.length; start++) {
        for (let end = start + 1; end < input.length; end++) {
            if (input.slice(start, end + 1).reduce((val, acc) => val + acc) === target) {
                let slice = input.slice(start, end + 1)
                return Math.min(...slice) + Math.max(...slice)
            }
        }
    }
}

console.log(part1(input))
console.log(part2(input))