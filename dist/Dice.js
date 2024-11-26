"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = void 0;
class Dice {
    constructor(faces) {
        if (faces.length !== 6 || !faces.every(Number.isInteger)) {
            throw new Error("Dice must have exactly 6 integer faces.");
        }
        this.faces = faces;
    }
    roll(index) {
        return this.faces[index];
    }
}
exports.Dice = Dice;
