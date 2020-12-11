const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(volt => parseInt(volt))

const part1 = input => {
    const devideMaxVoltage = Math.max(...input) + 3
    input.push(devideMaxVoltage)
    input = input.sort((a, b) => a - b)
    let voltDiffOne = 0
    let voltDiffTwo = 0
    let voltDiffThree = 0
    let lastAdapterVolt = 0
    for (let adapter of input) {
        if (adapter - lastAdapterVolt === 1) {
            voltDiffOne++
        } else if (adapter - lastAdapterVolt === 2) {
            voltDiffTwo++
        } else if (adapter - lastAdapterVolt === 3) {
            voltDiffThree++
        }
        lastAdapterVolt = adapter
    }
    return voltDiffOne * voltDiffThree
}

const part2 = input => {
    const devideMaxVoltage = Math.max(...input) + 3
    input.push(devideMaxVoltage)
    input.push(0)
    input = input.sort((a, b) => a - b)
    const availableNumber = new Set(input)
    const waysToReach = new Map()
    waysToReach.set(0, 1)
    let distinctWays = 0
    for (let i = 1; i < input.length; i++) {
        let currentAdapter = input[i]
        let nbReachable = 0
        for (let previous = 1; previous < 4; previous++) {
            if (availableNumber.has(currentAdapter - previous)) {
                nbReachable += waysToReach.get(currentAdapter - previous)
            }
        }
        waysToReach.set(currentAdapter, nbReachable)
        distinctWays = nbReachable
    }
    return distinctWays
}

console.log(part1(input))
console.log(part2(input))