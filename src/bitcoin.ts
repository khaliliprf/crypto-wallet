import { createHash } from "crypto";
import { bech32, bech32m } from "bech32";
import { validate, getAddressInfo } from "bitcoin-address-validation";
import schnorr from "bip-schnorr";
import coinkey from "coinkey";
import wif from "wif";

// import bech32 from "bech32";

import bs58 from "./base";
import ecurve, { getCurveByName } from "ecurve";
import { ECPairFactory, ECPairAPI, TinySecp256k1Interface } from "ecpair";

const secp256k1 = getCurveByName("secp256k1"),
  tinysecp: TinySecp256k1Interface = require("tiny-secp256k1"),
  ECPair: ECPairAPI = ECPairFactory(tinysecp);

export default new (class Bitcoin {
  getBech32AddressFromPubKey(compressedPubKey: string, testnet = false) {
    if (!["02", "03"].includes(compressedPubKey.slice(0, 2)))
      throw new Error("invalid public key");
    const h1 = createHash("sha256")
        .update(Buffer.from(compressedPubKey, "hex"))
        .digest(),
      h2 = createHash("rmd160").update(h1).digest(),
      bech32Words = bech32.toWords(h2),
      words = Uint8Array.from([0, ...bech32Words]),
      // tb for testnet
      // bc for mainnet
      prefix = testnet ? "tb" : "bc",
      address = bech32.encode(prefix, words);
    try {
      if (validate(address)) {
        return address;
      } else {
        throw new Error("invalid address");
      }
    } catch (error: any) {
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
    const keyPair = ECPair.fromWIF(prvKey),
      pubKey = ecurve.Point.decodeFrom(secp256k1, keyPair.publicKey),
      taprootPubKey = schnorr.taproot.taprootConstruct(pubKey),
      words = bech32.toWords(taprootPubKey),
      prefix = testnet ? "tb" : "bc";

    words.unshift(1);
    return bech32m.encode(prefix, words);
  }

  getP2pkhAddress(pubKey: Buffer, testnet = false) {
    const h1 = createHash("sha256").update(pubKey).digest(),
      h2 = createHash("rmd160").update(h1).digest();
    // 0x00 for mainnet
    // 0x6f for testnet
    const prefix = testnet ? 0x6f : 0x00,
      h3 = Buffer.concat([Buffer.from([prefix]), h2]),
      h4 = createHash("sha256").update(h3).digest(),
      checkSum = createHash("sha256").update(h4).digest().slice(0, 4),
      address = Buffer.concat([h3, checkSum]);

    return bs58.encode(address);
  }

  getPrivateKeyInWifFormat(privateKey: Buffer) {
    return wif.encode(128, Buffer.from(privateKey), true);
  }

  retrieveAddressFromPvInWifFormat(wifPv: string) {
    const ck = coinkey.fromWif(wifPv);
    return ck.publicAddress;
  }

  convertWifPvToHex(wifPv: string) {
    const ck = coinkey.fromWif(wifPv);
    return ck.privateKey.toString("hex");
  }
})();
