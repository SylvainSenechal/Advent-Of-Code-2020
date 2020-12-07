const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')

const processInput = input => {
    let hashBags = new Map()
    for (let bag of input) {
        let bagName = bag.match(/[a-z]+ [a-z]+/)[0]
        let contain = bag.match(/[0-9] [a-z]+ [a-z]+/g) || "nothing"
        let shinyPresence = bag.match(/[0-9] shiny gold/) != undefined
        if (contain !== "nothing") {
            contain = contain.map(elem => [elem.slice(0,1), elem.slice(2)])
        }
        hashBags.set(bagName, {contain: contain, shiny: shinyPresence})
    }
    return hashBags
}

const part1 = hashBags => {
    let nbShiny = 0
    for (let bag of hashBags) {
        if (canContain(bag[0], hashBags)) nbShiny++
    }
    return nbShiny
}

const canContain = (bagName, hashBags) => {
    let acc = 0
    let bag = hashBags.get(bagName)
    if (bag.shiny) return 1
    if (bag.contain === "nothing") return 0
    for (let i = 0; i < bag.contain.length; i++) {
        let newBag = bag.contain[i]
        acc += canContain(newBag[1], hashBags)
    }
    return acc
}

const part2 = hashBags => shinyRecursive("shiny gold", hashBags)

const shinyRecursive = (bagName, hashBags) => {
    let bag = hashBags.get(bagName)
    let acc = 0
    if (bag.contain === "nothing") return 0
    for (let i = 0; i < bag.contain.length; i++) {
        let newBag = bag.contain[i]
        acc += newBag[0] * (1 + shinyRecursive(newBag[1], hashBags))
    }
    return acc
}

const hashBags = processInput(input)

console.log(part1(hashBags))
console.log(part2(hashBags))