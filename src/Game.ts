import { Dice } from "./Dice";
import { FairRandomGenerator } from "./FairRandomGenerator";
import { HelpTableGenerator } from "./HelpTableGenerator";


import readline from "readline";

export class Game {
  dice: Dice[];

  constructor(dice: Dice[]) {
    this.dice = dice;
  }

  async start(): Promise<void> {
    console.log("Welcome to the Dice Game!");
    const fairChoice = FairRandomGenerator.generateRandom(2);
    console.log(`I selected a random value in the range 0..1 (HMAC=${fairChoice.hmac}).`);
  
    let userInput;
    do {
      userInput = await this.getUserInput("Try to guess my selection", ["0", "1"]);
      if (userInput === "X") {
        console.log("Exiting the game. Goodbye!");
        return;
      } else if (userInput === "?") {
        this.displayHelp();
      }
    } while (userInput !== "0" && userInput !== "1");
  
    const userGuess = Number(userInput);
    console.log(`My selection: ${fairChoice.value} (KEY=${fairChoice.key})`);
  
    let playerThrow, computerThrow;
    if (userGuess === fairChoice.value) {
      console.log("You go first!");
      playerThrow = await this.playerTurn();
      computerThrow = await this.computerTurn();
    } else {
      console.log("I make the first move!");
      computerThrow = await this.computerTurn();
      playerThrow = await this.playerTurn();
    }
  
    if (playerThrow > computerThrow) {
      console.log(`You win! (${playerThrow} > ${computerThrow})`);
    } else if (playerThrow < computerThrow) {
      console.log(`You lose! (${playerThrow} < ${computerThrow})`);
    } else {
      console.log(`It's a tie! (${playerThrow} = ${computerThrow})`);
    }
  }
  
  

  async getUserInput(question: string, options: string[]): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) => {
      const formattedOptions = options.map((opt, i) => `${opt} - ${opt}`).join("\n ");
      rl.question(`${question} \n ${formattedOptions}\n X - exit \n ? - help \n Your selection: `, (answer) => {
        rl.close();
        resolve(answer.trim().toUpperCase());
      });
    });
  }
  
  

  async playerTurn(): Promise<number> {
    console.log("Choose your dice:");
    this.dice.forEach((d, i) => console.log(`${i}: ${d.faces}`));
  
    let choice;
    do {
      choice = await this.getUserInput("Your selection", this.dice.map((_, i) => i.toString()));
      if (choice === "X") {
        console.log("Exiting the game. Goodbye!");
        return -1; // Indica salida del juego
      }
      if (!this.dice[Number(choice)]) {
        console.log("Invalid choice. Please select a valid dice index.");
      }
    } while (!this.dice[Number(choice)]);
  
    const playerChoice = Number(choice);
    const fairThrow = FairRandomGenerator.generateRandom(6);
    console.log(`I selected a random value in the range 0..5 (HMAC=${fairThrow.hmac}).`);
  
    let userNumber;
    do {
      userNumber = await this.getUserInput("Add your number modulo 6", ["0", "1", "2", "3", "4", "5"]);
      if (userNumber === "X") {
        console.log("Exiting the game. Goodbye!");
        return -1;
      }
      if (!/^[0-5]$/.test(userNumber)) {
        console.log("Invalid input. Please select a number between 0 and 5.");
      }
    } while (!/^[0-5]$/.test(userNumber));
  
    const userMod = Number(userNumber);
    const result = (fairThrow.value + userMod) % 6;
    console.log(`My number: ${fairThrow.value} (KEY=${fairThrow.key}).`);
    console.log(`The result is ${fairThrow.value} + ${userMod} = ${result} (mod 6).`);
    const playerThrow = this.dice[playerChoice].roll(result);
    console.log(`Your throw is ${playerThrow}.`);
  
    return playerThrow;
  }
  
  
  async computerTurn(): Promise<number> {
    const computerChoice = Math.floor(Math.random() * this.dice.length);
    console.log(`Computer chose dice: ${this.dice[computerChoice].faces}`);
  
    const diceRoll = FairRandomGenerator.generateRandom(6);
    console.log(`I selected a random value in the range 0..5 (HMAC=${diceRoll.hmac}).`);
  
    let userNumber;
    do {
      userNumber = await this.getUserInput("Add your number modulo 6", ["0", "1", "2", "3", "4", "5"]);
      if (userNumber === "X") {
        console.log("Exiting the game. Goodbye!");
        return -1;
      }
      if (!/^[0-5]$/.test(userNumber)) {
        console.log("Invalid input. Please select a number between 0 and 5.");
      }
    } while (!/^[0-5]$/.test(userNumber));
  
    const userMod = Number(userNumber);
    const result = (diceRoll.value + userMod) % 6;
    console.log(`My number: ${diceRoll.value} (KEY=${diceRoll.key}).`);
    console.log(`The result is ${diceRoll.value} + ${userMod} = ${result} (mod 6).`);
    const computerThrow = this.dice[computerChoice].roll(result);
    console.log(`Computer throw is ${computerThrow}.`);
  
    return computerThrow;
  }
  
  

  displayHelp(): void {
    console.log("Here's a table of probabilities:");
    console.log(HelpTableGenerator.generate(this.dice));
  }
  
}

