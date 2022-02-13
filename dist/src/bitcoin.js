"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const bech32_1 = require("bech32");
const bitcoin_address_validation_1 = require("bitcoin-address-validation");
const bip_schnorr_1 = __importDefault(require("bip-schnorr"));
const coinkey_1 = __importDefault(require("coinkey"));
const wif_1 = __importDefault(require("wif"));
// import bech32 from "bech32";
const base_1 = __importDefault(require("./base"));
const ecurve_1 = __importStar(require("ecurve"));
const ecpair_1 = require("ecpair");
const secp256k1 = (0, ecurve_1.getCurveByName)("secp256k1"), tinysecp = require("tiny-secp256k1"), ECPair = (0, ecpair_1.ECPairFactory)(tinysecp);
exports.default = new (class Bitcoin {
    getBech32AddressFromPubKey(compressedPubKey, testnet = false) {
        if (!["02", "03"].includes(compressedPubKey.slice(0, 2)))
            throw new Error("invalid public key");
        const h1 = (0, crypto_1.createHash)("sha256")
            .update(Buffer.from(compressedPubKey, "hex"))
            .digest(), h2 = (0, crypto_1.createHash)("rmd160").update(h1).digest(), bech32Words = bech32_1.bech32.toWords(h2), words = Uint8Array.from([0, ...bech32Words]), 
        // tb for testnet
        // bc for mainnet
        prefix = testnet ? "tb" : "bc", address = bech32_1.bech32.encode(prefix, words);
        try {
            if ((0, bitcoin_address_validation_1.validate)(address)) {
                return address;
            }
            else {
                throw new Error("invalid address");
            }
        }
        catch (error) {
            return error.message;
        }
    }
    // P2TR (taproot/segwit v1)
    // TODO
    // sample address:
    // sample address: bc1qqk25l7y93husexzq932nwetu9628drqpg6d6a6yee5nd3pj6k48s0x9j39 BECH32 (P2WSH) address from explorer
    // output address: bc1pj8v6u0u34a0lhpde7sxtd9rhf7p47u8savnhn3uj5au2fsj0664s46fy7g
    getTaprootAddress(prvKey, testnet) {
        // // create pubKey
        const keyPair = ECPair.fromWIF(prvKey), pubKey = ecurve_1.default.Point.decodeFrom(secp256k1, keyPair.publicKey), taprootPubKey = bip_schnorr_1.default.taproot.taprootConstruct(pubKey), words = bech32_1.bech32.toWords(taprootPubKey), prefix = testnet ? "tb" : "bc";
        words.unshift(1);
        return bech32_1.bech32m.encode(prefix, words);
    }
    getP2pkhAddress(pubKey, testnet = false) {
        const h1 = (0, crypto_1.createHash)("sha256").update(pubKey).digest(), h2 = (0, crypto_1.createHash)("rmd160").update(h1).digest();
        // 0x00 for mainnet
        // 0x6f for testnet
        const prefix = testnet ? 0x6f : 0x00, h3 = Buffer.concat([Buffer.from([prefix]), h2]), h4 = (0, crypto_1.createHash)("sha256").update(h3).digest(), checkSum = (0, crypto_1.createHash)("sha256").update(h4).digest().slice(0, 4), address = Buffer.concat([h3, checkSum]);
        return base_1.default.encode(address);
    }
    getPrivateKeyInWifFormat(privateKey) {
        return wif_1.default.encode(128, Buffer.from(privateKey), true);
    }
    retrieveAddressFromPvInWifFormat(wifPv) {
        const ck = coinkey_1.default.fromWif(wifPv);
        return ck.publicAddress;
    }
    convertWifPvToHex(wifPv) {
        const ck = coinkey_1.default.fromWif(wifPv);
        return ck.privateKey.toString("hex");
    }
})();
