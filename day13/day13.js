const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')

const part1 = input => {
    let earliest = parseInt(input[0])
    let buses = input[1].split(',').filter(busID => busID !== "x")
    buses = buses.map(id => parseInt(id))

    let busFound = false
    let timeDeparture = earliest - 1
    let busID = - 1
    while (!busFound) {
        timeDeparture++
        for (let i = 0; i < buses.length; i++) {
            if (timeDeparture % buses[i] === 0) {
                busFound = true
                busID = buses[i]
            }
        }
    }
    return (timeDeparture - earliest) * busID
}

const part2 = input => {
    let buses = input[1].split(',').filter(busID => busID !== "x")
    buses = buses.map(id => parseInt(id))
    console.log(buses)
    let busFound = false
    let timeDeparture = earliest - 1
    let busID = - 1
    while (!busFound) {
        timeDeparture++
        for (let i = 0; i < buses.length; i++) {
            if (timeDeparture % buses[i] === 0) {
                busFound = true
                busID = buses[i]
            }
        }
    }
    return (timeDeparture - earliest) * busID
}

console.log(part1(input))
console.log(part2(input))