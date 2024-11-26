import { Dice } from "./Dice";

export class ProbabilityCalculator {
  static calculateProbabilities(dice: Dice[]): number[][] {
    const probabilities = Array(dice.length)
      .fill(0)
      .map(() => Array(dice.length).fill(0));

    for (let i = 0; i < dice.length; i++) {
      for (let j = 0; j < dice.length; j++) {
        if (i === j) continue;

        let winCount = 0;
        let totalCount = 0;

        for (let x = 0; x < 6; x++) {
          for (let y = 0; y < 6; y++) {
            totalCount++;
            if (dice[i].faces[x] > dice[j].faces[y]) {
              winCount++;
            }
          }
        }

        probabilities[i][j] = winCount / totalCount;
      }
    }

    return probabilities;
  }
}
