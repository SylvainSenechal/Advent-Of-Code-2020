use std::io;
use std::fs::File;
use std::io::Read;
use std::time::SystemTime;

#[derive(Debug)]
struct Entry {
    min: i32,
    max: i32,
    letter: char,
    password: String
}

fn read_input() -> Result<Vec<Entry>, io::Error> {
    let mut content = String::new();
    let mut entries: Vec<Entry> = Vec::new();
    File::open("input.txt")?.read_to_string(&mut content)?;
    let content: Vec<Vec<&str>> = content.split('\n')
        .map(|line| line.split(' ').collect())
        .collect();

    for elem in content {
        let edges: Vec<_> = elem[0].split('-')
            .map(|string| string.parse::<i32>().unwrap())
            .collect();     
        entries.push(
            Entry {
                min: edges[0],
                max: edges[1],
                letter: elem[1].chars().next().unwrap(),
                password: elem[2].to_string()
            }
        );
    }
    Ok(entries)
}

fn part1(passwords: &Vec<Entry>) -> i32 {
    passwords.iter()
        .filter(|entry| {
            let letter_counted: i32 = entry.password.matches(entry.letter).count() as i32;
            letter_counted >= entry.min && letter_counted <= entry.max
        })
        .count() as i32
}

fn part2(passwords: &Vec<Entry>) -> i32 {
    passwords.iter()
        .filter(|entry| {
            let letter_counted: i32 = entry.password.matches(entry.letter).count() as i32;
            let condition1 = entry.password.chars().nth((entry.min - 1) as usize).unwrap() == entry.letter;
            let condition2 = entry.password.chars().nth((entry.max - 1) as usize).unwrap() == entry.letter;
            condition1 != condition2
        })
        .count() as i32
}

fn main() -> Result<(), std::io::Error> {
    let content = read_input()?;

    let now = SystemTime::now();
    let result1 = part1(&content);
    let result2 = part2(&content);
    println!("{:?}", result1);
    println!("{:?}", result2);
    println!("{:?}", now.elapsed());

    Ok(())
}