import { Dice } from "./Dice";

export class DiceParser {
    static parse(args: string[]): Dice[] {
      if (args.length < 3) {
        throw new Error("At least three dice must be specified.");
      }
  
      return args.map((arg) => {
        const faces = arg.split(",").map(Number);
        if (faces.some(isNaN)) {
          throw new Error(`Invalid dice configuration: ${arg}`);
        }
        return new Dice(faces);
      });
    }
  }
  