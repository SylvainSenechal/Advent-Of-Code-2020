// const input = (await Deno.readTextFile("./input.txt"))
//     .split('\n\n')
//     .map(fieldsList => fieldsList.split('\n')
//         .map(row => row.split(' ')
//         .map(keyValue => keyValue.split(':'))
//         )
//     )

const input = (await Deno.readTextFile("./input.txt"))
    .split('\n\n')
    .map(fieldList => fieldList.replaceAll('\n', ' ').split(' '))
    .map(credentials => {
        return credentials.reduce((acc, keyValue) => {
            let [field, value] = keyValue.split(':')
            return acc.set(field, value)
        }, new Map())
    })
    // .map(credentials => credentials.map(keyId => keyId.split(':')))
    // .map(credentials => credentials.map(keyId => {
    //     let [field, value] = keyId.split(':')
    //     return {field: field, value: value}
    // }))
    // .map(credentials => credentials.map(keyId => keyId.slice(0, 3)))

const part1 = input => {
    let validPassports = input.reduce((acc, passport) => {
        if (passport.size === 8) return acc + 1
        if (passport.size === 7 && !passport.has('cid')) return acc + 1
        return acc
    }, 0)
    return validPassports
}

const part2 = input => {
    let eyesEnums = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    let validPassports = input.reduce((acc, passport) => {
        if (!passport.get('byr')) return acc
        if (!passport.get('iyr')) return acc
        if (!passport.get('eyr')) return acc
        if (!passport.get('hgt')) return acc
        if (!passport.get('hcl')) return acc
        if (!passport.get('ecl')) return acc
        if (!passport.get('pid')) return acc

        if (passport.get('byr') < 1920 || passport.get('byr') > 2002) return acc
        if (passport.get('iyr') < 2010 || passport.get('iyr') > 2020) return acc
        if (passport.get('eyr') < 2020 || passport.get('eyr') > 2030) return acc
     
        let hairColor = passport.get('hcl')
        let pid = passport.get('pid')
        let eyesColor = passport.get('ecl')
        if (!hairColor.match(/#[a-f0-9]{6}/)) return acc
        if (!eyesEnums.includes(eyesColor)) return acc
        if (pid.length !== 9) return acc
      
        let height = passport.get('hgt')
        let size = height.slice(0, height.length - 2)
        let sizeType = height.slice(height.length - 2, height.length)
        if (sizeType === "cm") {
            if (size < 150 || size > 193) return acc
        } else if (sizeType === "in") {
            if (size < 59 || size > 76) return acc
        } else if (sizeType !== "cm" && sizeType !== "in") return acc

        return acc + 1
    }, 0)
    return validPassports
}

console.log(part1(input))
console.log(part2(input))