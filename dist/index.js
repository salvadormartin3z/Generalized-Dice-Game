"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiceParser_1 = require("./DiceParser");
const Game_1 = require("./Game");
const args = process.argv.slice(2);
try {
    const dice = DiceParser_1.DiceParser.parse(args);
    const game = new Game_1.Game(dice);
    game.start();
}
catch (error) {
    console.error(error.message);
    console.error("Usage: node index.js <dice1> <dice2> <dice3> ... (e.g., 1,2,3,4,5,6 6,6,6,6,6,6 1,1,1,1,1,1)");
}
