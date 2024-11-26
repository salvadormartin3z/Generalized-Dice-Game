export class Dice {
    faces: number[];
  
    constructor(faces: number[]) {
      if (faces.length !== 6 || !faces.every(Number.isInteger)) {
        throw new Error("Dice must have exactly 6 integer faces.");
      }
      this.faces = faces;
    }
  
    roll(index: number): number {
      return this.faces[index];
    }
  }
  