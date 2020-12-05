use std::io;
use std::fs::File;
use std::io::Read;
use std::time::SystemTime;

fn read_input() -> Result<Vec<i32>, io::Error> {
    let mut content = String::new();
    File::open("input.txt")?.read_to_string(&mut content)?;
    let processed_input: Vec<i32> = content.split('\n')
        .map(|coded_seat| {
            i32::from_str_radix(&coded_seat.chars().fold(String::new(), |acc, x| {
                match x {
                    'F' | 'L' => acc + "0",
                    _ => acc + "1"
                }
            }), 2).unwrap()
        })
        .collect();
    Ok(processed_input)
}

fn part1(input: &Vec<i32>) -> i32 {
    *input.iter().max().unwrap()
}

fn part2(input: &mut Vec<i32>) -> Option<i32> {
    input.sort();
    for i in 1..input.len() - 1 {
        if input[i] + input[i + 1] != input[i] + input[i] + 1 {
            return Some(input[i] + 1)
        }
    }
    None
}

fn main() -> Result<(), std::io::Error> {
    let mut input = read_input()?;
    // input.sort();
    let now = SystemTime::now();
    let result1 = part1(&input);
    let result2 = part2(&mut input);
    println!("{:?}", result1);
    println!("{:?}", result2.unwrap());
    println!("{:?}", now.elapsed());

    Ok(())
}