const input1 = (await Deno.readTextFile("./input.txt"))
    .split('\n\n')
    .map(groupAnswers => groupAnswers.replaceAll('\n', ''))

const part1 = input => {
    return input.reduce((acc, answers) => acc + new Set(answers).size, 0)
}

const input2 = (await Deno.readTextFile("./input.txt"))
    .split('\n\n')
    .map(groupAnswers => groupAnswers.split('\n').map(person => person.split('')))

const part2 = input => {
    return input.reduce((acc, answers) => {
        return acc + answers.reduce((acc2, answer) => {
            return acc2.filter(elem => answer.includes(elem))
        }).length
    }, 0)
}

console.log(part1(input1))
console.log(part2(input2))