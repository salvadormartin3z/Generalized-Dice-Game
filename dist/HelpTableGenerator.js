"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpTableGenerator = void 0;
const ProbabilityCalculator_1 = require("./ProbabilityCalculator");
const cli_table_1 = __importDefault(require("cli-table"));
class HelpTableGenerator {
    static generate(dice) {
        const probabilities = ProbabilityCalculator_1.ProbabilityCalculator.calculateProbabilities(dice);
        const table = new cli_table_1.default({
            head: ["User Dice \\ Opponent Dice", ...dice.map((_, i) => `Dice ${i + 1}`)],
        });
        dice.forEach((_, i) => {
            const row = [`Dice ${i + 1}`, ...probabilities[i].map((p) => p.toFixed(4))];
            table.push(row);
        });
        return table.toString();
    }
}
exports.HelpTableGenerator = HelpTableGenerator;
