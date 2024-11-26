import { DiceParser } from "./DiceParser";
import { Game } from "./Game";

const args = process.argv.slice(2);

try {
  const dice = DiceParser.parse(args);
  const game = new Game(dice);
  game.start();
} catch (error: any) {
  console.error(error.message);
  console.error(
    "Usage: node index.js <dice1> <dice2> <dice3> ... (e.g., 1,2,3,4,5,6 6,6,6,6,6,6 1,1,1,1,1,1)"
  );
}
