"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const secp256k1_1 = __importDefault(require("secp256k1"));
const keccak256_1 = __importDefault(require("keccak256"));
const base_1 = __importDefault(require("./base"));
exports.default = new (class Tron {
    constructor() {
        this.publicToAddress = (publicKey) => {
            // Convert a publicKey to compressed or uncompressed form.
            const publicCompressed = secp256k1_1.default.publicKeyConvert(publicKey, false);
            // slice(1) => remove 04 from the beginning
            const pubComBuffer = Buffer.from(publicCompressed).slice(1);
            const address = Buffer.concat([
                Buffer.from([0x41]),
                (0, keccak256_1.default)(pubComBuffer).slice(-20),
            ]);
            // baseCheck process
            const h1 = (0, crypto_1.createHash)("sha256").update(address).digest();
            // slice 4 byte from h2 beginning and add it to end of address
            const h2 = (0, crypto_1.createHash)("sha256").update(h1).digest().slice(0, 4);
            const baseCheck = Buffer.concat([address, h2]);
            // at the end we should convert address to base58 address
            return base_1.default.encode(baseCheck);
        };
    }
})();
