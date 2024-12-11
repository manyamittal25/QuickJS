#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      'Who Wants To Be A JavaScript Millionaire? \n'
    );
  
    await sleep();
    rainbowTitle.stop();
  
    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')} 
      I am a process on your computer.
      If you get any question wrong I will be ${chalk.bgRed('killed')}
      So get all the questions right...
  
    `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');
  
      console.log(
        chalk.green(
          `Programming isn't about what you know; it's about making the command line look cool`
        )
      );
      process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
      name: 'question_1',
      type: 'list',
      message: 'JavaScript was created in 10 days then released on\n',
      choices: [
        'May 23rd, 1995',
        'Nov 24th, 1995',
        'Dec 4th, 1995',
        'Dec 17, 1996',
      ],
    });
  
    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
      choices: ['4', '"4"', '"1111"', '69420'],
    });
    return handleAnswer(answers.question_2 === '"1111"');
}

async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
      choices: ['0', '🐏', '🐍', 'undefined'],
    });
  
    return handleAnswer(answers.question_3 === 'undefined');
}

async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'Which of the following is NOT a primitive type?\n',
      choices: [
        'boolean',
        'number',
        'null',
        'object', // Correct
      ],
    });
    return handleAnswer(answers.question_4 === 'object');
}

async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message:
        'JS is a high-level single-threaded, garbage-collected,\n' +
        'interpreted(or just-in-time compiled), prototype-based,\n' +
        'multi-paradigm, dynamic language with a ____ event loop\n',
      choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
    });
  
    return handleAnswer(answers.question_5 === 'non-blocking');
}

async function question6() {
    const answers = await inquirer.prompt({
      name: 'question_6',
      type: 'list',
      message: 'What does "typeof null" return in JavaScript?\n',
      choices: ['null', 'undefined', 'object', 'number'],
    });
    return handleAnswer(answers.question_6 === 'object');
}

async function question7() {
    const answers = await inquirer.prompt({
      name: 'question_7',
      type: 'list',
      message: 'Which company developed JavaScript?\n',
      choices: ['Microsoft', 'Netscape', 'Google', 'Oracle'],
    });
    return handleAnswer(answers.question_7 === 'Netscape');
}

async function question8() {
    const answers = await inquirer.prompt({
      name: 'question_8',
      type: 'list',
      message: 'Which symbol is used for comments in JavaScript?\n',
      choices: ['//', '#', '<!-- -->', '/* */'],
    });
    return handleAnswer(answers.question_8 === '//');
}

async function question9() {
    const answers = await inquirer.prompt({
      name: 'question_9',
      type: 'list',
      message: 'What is the output of console.log([] + []) in JavaScript?\n',
      choices: ['""', '[]', 'undefined', 'TypeError'],
    });
    return handleAnswer(answers.question_9 === '""');
}

async function question10() {
    const answers = await inquirer.prompt({
      name: 'question_10',
      type: 'list',
      message: 'What will this evaluate to? "5" - 2\n',
      choices: ['3', 'NaN', '52', 'TypeError'],
    });
    return handleAnswer(answers.question_10 === '3');
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
winner();

