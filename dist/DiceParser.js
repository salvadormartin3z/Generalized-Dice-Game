"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceParser = void 0;
const Dice_1 = require("./Dice");
class DiceParser {
    static parse(args) {
        if (args.length < 3) {
            throw new Error("At least three dice must be specified.");
        }
        return args.map((arg) => {
            const faces = arg.split(",").map(Number);
            if (faces.some(isNaN)) {
                throw new Error(`Invalid dice configuration: ${arg}`);
            }
            return new Dice_1.Dice(faces);
        });
    }
}
exports.DiceParser = DiceParser;
