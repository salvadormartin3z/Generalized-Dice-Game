"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const FairRandomGenerator_1 = require("./FairRandomGenerator");
const HelpTableGenerator_1 = require("./HelpTableGenerator");
const readline_1 = __importDefault(require("readline"));
class Game {
    constructor(dice) {
        this.dice = dice;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Welcome to the Dice Game!");
            const fairChoice = FairRandomGenerator_1.FairRandomGenerator.generateRandom(2);
            console.log(`I selected a random value in the range 0..1 (HMAC=${fairChoice.hmac}).`);
            let userInput;
            do {
                userInput = yield this.getUserInput("Try to guess my selection", ["0", "1"]);
                if (userInput === "X") {
                    console.log("Exiting the game. Goodbye!");
                    return;
                }
                else if (userInput === "?") {
                    this.displayHelp();
                }
            } while (userInput !== "0" && userInput !== "1");
            const userGuess = Number(userInput);
            console.log(`My selection: ${fairChoice.value} (KEY=${fairChoice.key})`);
            let playerThrow, computerThrow;
            if (userGuess === fairChoice.value) {
                console.log("You go first!");
                playerThrow = yield this.playerTurn();
                computerThrow = yield this.computerTurn();
            }
            else {
                console.log("I make the first move!");
                computerThrow = yield this.computerTurn();
                playerThrow = yield this.playerTurn();
            }
            if (playerThrow > computerThrow) {
                console.log(`You win! (${playerThrow} > ${computerThrow})`);
            }
            else if (playerThrow < computerThrow) {
                console.log(`You lose! (${playerThrow} < ${computerThrow})`);
            }
            else {
                console.log(`It's a tie! (${playerThrow} = ${computerThrow})`);
            }
        });
    }
    getUserInput(question, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = readline_1.default.createInterface({
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
        });
    }
    playerTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Choose your dice:");
            this.dice.forEach((d, i) => console.log(`${i}: ${d.faces}`));
            let choice;
            do {
                choice = yield this.getUserInput("Your selection", this.dice.map((_, i) => i.toString()));
                if (choice === "X") {
                    console.log("Exiting the game. Goodbye!");
                    return -1; // Indica salida del juego
                }
                if (!this.dice[Number(choice)]) {
                    console.log("Invalid choice. Please select a valid dice index.");
                }
            } while (!this.dice[Number(choice)]);
            const playerChoice = Number(choice);
            const fairThrow = FairRandomGenerator_1.FairRandomGenerator.generateRandom(6);
            console.log(`I selected a random value in the range 0..5 (HMAC=${fairThrow.hmac}).`);
            let userNumber;
            do {
                userNumber = yield this.getUserInput("Add your number modulo 6", ["0", "1", "2", "3", "4", "5"]);
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
        });
    }
    computerTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            const computerChoice = Math.floor(Math.random() * this.dice.length);
            console.log(`Computer chose dice: ${this.dice[computerChoice].faces}`);
            const diceRoll = FairRandomGenerator_1.FairRandomGenerator.generateRandom(6);
            console.log(`I selected a random value in the range 0..5 (HMAC=${diceRoll.hmac}).`);
            let userNumber;
            do {
                userNumber = yield this.getUserInput("Add your number modulo 6", ["0", "1", "2", "3", "4", "5"]);
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
        });
    }
    displayHelp() {
        console.log("Here's a table of probabilities:");
        console.log(HelpTableGenerator_1.HelpTableGenerator.generate(this.dice));
    }
}
exports.Game = Game;
