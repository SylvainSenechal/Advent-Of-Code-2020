const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')

const part1 = input => {
    let memory = []
    let mask = ""
    for (let line of input) {
        if (line[1] === "a") {
            mask = line.match(/[10X]+/g)[0]
        } else {
            let [address, number] = line.match(/[0-9]+/g)
            number = parseInt(number).toString(2).padStart(36, '0')
                .split('')
                .map((elem, id) => {
                    if (mask[id] === '1') return '1'
                    if (mask[id] === '0') return '0'
                    return elem
                })
                .join('')
            memory[address] = parseInt(number, 2)
        }
    }
    return memory.reduce((acc, value) => acc + value)
}

const part2 = input => {
    let memory = new Map()
    let mask = ""
    for (let line of input) {
        if (line[1] === "a") {
            mask = line.match(/[10X]+/g)[0]
        } else {
            let [address, number] = line.match(/[0-9]+/g)
            address = parseInt(address).toString(2).padStart(36, '0')
                .split('')
                .map((elem, id) => {
                    if (mask[id] === '1') return '1'
                    if (mask[id] === 'X') return 'X'
                    return elem
                })
                .join('')
            let addresses = generateAddresses(address)
            addresses.forEach(address => {
                memory.set(parseInt(address, 2), parseInt(number))
            })
        }
    }

    let sum = 0
    memory.forEach(val => sum += val)
    return sum
}

const generateAddresses = (initAddress = "0X0X0X") => {
    let splittedAddress = initAddress.split('')
    let addresses = [splittedAddress]

    for (let i = 0; i < 36; i++) {
        if (splittedAddress[i] === "X") {
            let nextAddresses = []
            for (let address of addresses) {
                let add1 = [...address]
                let add2 = [...address]
                add1[i] = '0'
                add2[i] = '1'
                nextAddresses.push(add1)
                nextAddresses.push(add2)
            }
            addresses = nextAddresses
        }
    }
    addresses = addresses.map(address => address.join(''))
    return addresses
}

console.log(part1(input))
console.log(part2(input))