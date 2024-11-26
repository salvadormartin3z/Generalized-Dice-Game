import { createHmac, randomBytes } from "crypto";

export class FairRandomGenerator {
  static generateRandom(range: number): { value: number; key: string; hmac: string } {
    const key = randomBytes(32).toString("hex");
    const value = Math.floor(Math.random() * range);
    const hmac = createHmac("sha3-256", key).update(value.toString()).digest("hex");
    return { value, key, hmac };
  }
}
