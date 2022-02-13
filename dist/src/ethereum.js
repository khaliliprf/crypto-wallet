"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secp256k1_1 = __importDefault(require("secp256k1"));
const keccak256_1 = __importDefault(require("keccak256"));
exports.default = new (class Ethereum {
    /**
     * @description take public key and return associated address
     *  address in ethereum is 20 byte
        address in hex is 40 characters
       .publicKeyConvert(publicKey: Uint8Array, compressed: boolean = true, output: Uint8Array | ((len: number) => Uint8Array) = (len) => new Uint8Array(len)): Uint8Array
      // Reserialize public key to another format
     * @param publicKey
     * @returns address
     */
    publicToAddress(publicKey) {
        const publicCompressed = secp256k1_1.default.publicKeyConvert(publicKey, false), pubComBuffer = Buffer.from(publicCompressed).slice(1), address = Buffer.from((0, keccak256_1.default)(pubComBuffer).slice(-20)), hexAddress = address.toString("hex").toLowerCase(), hash = (0, keccak256_1.default)(hexAddress).toString("hex");
        let checksum = "0x";
        for (let i = 0; i < String(hexAddress).length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
                checksum += String(hexAddress[i]).toUpperCase();
            }
            else {
                checksum += hexAddress[i];
            }
        }
        return checksum;
    }
})();
