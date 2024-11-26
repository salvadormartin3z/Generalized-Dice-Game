"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FairRandomGenerator = void 0;
const crypto_1 = require("crypto");
class FairRandomGenerator {
    static generateRandom(range) {
        const key = (0, crypto_1.randomBytes)(32).toString("hex");
        const value = Math.floor(Math.random() * range);
        const hmac = (0, crypto_1.createHmac)("sha3-256", key).update(value.toString()).digest("hex");
        return { value, key, hmac };
    }
}
exports.FairRandomGenerator = FairRandomGenerator;
