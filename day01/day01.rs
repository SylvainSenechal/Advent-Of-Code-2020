use std::io;
use std::fs::File;
use std::io::Read;
use std::time::SystemTime;

fn read_input() -> Result<Vec<i32>, io::Error> {
    let mut content = String::new();
    File::open("input.txt")?.read_to_string(&mut content)?;
    let mut entries: Vec<i32> = Vec::new();

    for line in content.lines() {
        entries.push(line.parse::<i32>().unwrap());
    }

    Ok(entries)
}

fn part1(input: &Vec<i32>) -> Option<i32> {
    for i in 0..input.len() {
        for j in 0..input.len() {
            if i != j {
                if input[i] + input[j] == 2020 {
                    return Some(input[i] * input[j])
                }
            }
        }
    }
    None
}

fn part2(input: &Vec<i32>) -> Option<i32> {
    for i in 0..input.len() {
        for j in 0..input.len() {
            for k in 0..input.len() {
                if i != j && i != k && j != k {
                    if input[i] + input[j] + input[k] == 2020 {
                        return Some(input[i] * input[j] * input[k])
                    }
                }
            }
        }
    }
    None
}

fn main() -> Result<(), std::io::Error> {
    let mut content = read_input()?;
    content.sort();

    let now = SystemTime::now();
    let result1 = match part1(&content) {
        Some(x) => x,
        None => 0
    };
    let result2 = match part2(&content) {
        Some(x) => x,
        None => 0
    };
    println!("{:?}", result1);
    println!("{:?}", result2);
    println!("{:?}", now.elapsed());

    Ok(())
}