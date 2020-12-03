use std::io;
use std::fs::File;
use std::io::Read;
use std::time::SystemTime;

fn read_input() -> Result<Vec<Vec<char>>, io::Error> {
    let mut content = String::new();
    File::open("input.txt")?.read_to_string(&mut content)?;
    let processed_input: Vec<Vec<char>> = content.split('\n')
        .map(|line| line.chars().collect())
        .collect();
    Ok(processed_input)
}

fn part1(input: &Vec<Vec<char>>, slope_x: usize, slope_y: usize) -> i64 {
    let mut nb_tree_found = 0;
    let mut pos_x = 0;
    let mut pos_y = 0;
    let width = input[0].len();
    let height = input.len();

    while pos_y < height - 1 {
        pos_y += slope_y;
        pos_x = (pos_x + slope_x) % width;
        if input[pos_y][pos_x] == '#' {
            nb_tree_found += 1;
        }
    }
    nb_tree_found
}

fn part2(input: &Vec<Vec<char>>) -> i64 {
    let mult1 = part1(&input, 1, 1);
    let mult2 = part1(&input, 3, 1);
    let mult3 = part1(&input, 5, 1);
    let mult4 = part1(&input, 7, 1);
    let mult5 = part1(&input, 1, 2);

    mult1 * mult2 * mult3 * mult4 * mult5
}

fn main() -> Result<(), std::io::Error> {
    let input = read_input()?;
    let now = SystemTime::now();
    let result1 = part1(&input, 3, 1);
    let result2 = part2(&input);
    println!("{:?}", result1);
    println!("{:?}", result2);
    println!("{:?}", now.elapsed());

    Ok(())
}