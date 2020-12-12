const input = (await Deno.readTextFile("./input.txt"))
    .split('\n')

const part1 = input => {
    let angle = 0
    let position = {x: 0, y: 0}
    for (let i = 0; i < input.length; i++) {
        let instruction = input[i][0]
        let value = parseInt(input[i].slice(1))
        if (instruction === "N") position.y += value
        if (instruction === "S") position.y -= value
        if (instruction === "E") position.x += value
        if (instruction === "W") position.x -= value

        if (instruction === "L") angle += value
        if (instruction === "R") angle -= value
        angle = angle % 360
        if (instruction === "F") {
            position.x += Math.cos(angle * Math.PI / 180) * value
            position.y += Math.sin(angle * Math.PI / 180) * value
        }
    }
    return (Math.abs(position.x) + Math.abs(position.y))
}

const part2 = input => {
    let position = {x: 0, y: 0}
    let waypoint = {x: 10, y: 1}
    for (let i = 0; i < input.length; i++) {
        let instruction = input[i][0]
        let value = parseInt(input[i].slice(1))
        if (instruction === "N") waypoint.y += value
        if (instruction === "S") waypoint.y -= value
        if (instruction === "E") waypoint.x += value
        if (instruction === "W") waypoint.x -= value

        if (instruction === "L") {
            let tpmX = waypoint.x
            waypoint.x = Math.cos(value * Math.PI / 180) * waypoint.x - Math.sin(value * Math.PI / 180) * waypoint.y
            waypoint.y = Math.sin(value * Math.PI / 180) * tpmX + Math.cos(value * Math.PI / 180) * waypoint.y
        }
        if (instruction === "R") {
            let tpmX = waypoint.x
            waypoint.x = Math.cos(- value * Math.PI / 180) * waypoint.x - Math.sin(- value * Math.PI / 180) * waypoint.y
            waypoint.y = Math.sin(- value * Math.PI / 180) * tpmX + Math.cos(- value * Math.PI / 180) * waypoint.y
        }
        if (instruction === "F") {
            position.x += waypoint.x * value
            position.y += waypoint.y * value
        }
    }
    return (Math.abs(position.x) + Math.abs(position.y))
}

console.log(part1(input))
console.log(part2(input))