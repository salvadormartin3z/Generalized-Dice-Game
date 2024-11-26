import { ProbabilityCalculator } from "./ProbabilityCalculator";
import { Dice } from "./Dice";
import Table from "cli-table";

export class HelpTableGenerator {
  static generate(dice: Dice[]): string {
    const probabilities = ProbabilityCalculator.calculateProbabilities(dice);
    const table = new Table({
      head: ["User Dice \\ Opponent Dice", ...dice.map((_, i) => `Dice ${i + 1}`)],
    });

    dice.forEach((_, i) => {
      const row = [`Dice ${i + 1}`, ...probabilities[i].map((p) => p.toFixed(4))];
      table.push(row);
    });

    return table.toString();
  }
}
