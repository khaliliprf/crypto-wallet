"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = __importDefault(require("./src/bitcoin"));
const tron_1 = __importDefault(require("./src/tron"));
const ethereum_1 = __importDefault(require("./src/ethereum"));
// export default new (class CryptoWallet {})();
exports.default = {
    bitcoin: bitcoin_1.default,
    ethereum: ethereum_1.default,
    tron: tron_1.default,
};
