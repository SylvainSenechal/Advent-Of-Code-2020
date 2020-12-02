const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')
    .map(line => line.split(' '))

let processedInput = []

for (let entry of input) {
    let [min, max] = entry[0].split('-') 
    processedInput.push({
        min: min,
        max: max,
        letter: entry[1][0],
        password: entry[2].split('')
    })
}

const part1 = input => {
    let validPasswords = 0
    for (let entry of input) {
        let letterCounted = entry.password.filter(letter => letter === entry.letter).length
        if (letterCounted >= entry.min && letterCounted <= entry.max) {
            validPasswords += 1
        }
    }
    return validPasswords
}

const part2 = input => {
    let validPasswords = 0
    for (let entry of input) {
        let letterCounted = entry.password.filter(letter => letter === entry.letter).length
        let validPosition = 0
        if (entry.password[entry.min - 1] === entry.letter) {
            validPosition += 1
        }
        if (entry.password[entry.max - 1] === entry.letter) {
            validPosition += 1
        }
        if (validPosition === 1) {
            validPasswords += 1
        }
    }
    return validPasswords
}

console.log(part1(processedInput))
console.log(part2(processedInput))