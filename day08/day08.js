const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(instruction => {
        let [typeInstruction, value] = instruction.split(' ')
        if (value[0] === "+") {
            value = parseInt(value.slice(1))
        } else {
            value = - parseInt(value.slice(1))
        }
        return {instruction: typeInstruction, value: value}
    })

const part1 = input => {
    let acc = 0
    let operationId = 0
    let seenOperation = new Map()
    while (1) {
        if (operationId === input.length) {
            return {terminated: true, acc: acc}
        }
        if (input[operationId].instruction === "nop") {
            if (seenOperation.has(operationId)) {
                return {terminated: false, acc: acc}
            } else {
                seenOperation.set(operationId, 'seen')
                operationId++
            }
        } else if (input[operationId].instruction === "acc") {
            if (seenOperation.has(operationId)) {
                return {terminated: false, acc: acc}
            } else {
                seenOperation.set(operationId, 'seen')
                acc += input[operationId].value
                operationId++
            }
        } else if (input[operationId].instruction === "jmp") {
            if (seenOperation.has(operationId)) {
                return {terminated: false, acc: acc}
            } else {
                seenOperation.set(operationId, 'seen')
                operationId += input[operationId].value
            }
        }
    }
}

const part2 = input => {
    let opposites = {
        "nop": "jmp",
        "jmp": "nop"
    }
    for (let i = 0; i < input.length; i++) {
        if (input[i].instruction === "jmp" || input[i].instruction === "nop") {
            input[i].instruction = opposites[input[i].instruction]
            let terminates = part1(input)
            if (terminates.terminated) {
                return terminates.acc
            }
            input[i].instruction = opposites[input[i].instruction]
        }
    }
}

console.log(part1(input).acc)
console.log(part2(input))