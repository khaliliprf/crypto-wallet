import { createHash } from "crypto";
import secp256K1 from "secp256k1";
import keccak256 from "keccak256";

import bs58 from "./base";

export default new (class Tron {
  publicToAddress = (publicKey: Buffer) => {
    // Convert a publicKey to compressed or uncompressed form.
    const publicCompressed = secp256K1.publicKeyConvert(publicKey, false);
    // slice(1) => remove 04 from the beginning
    const pubComBuffer = Buffer.from(publicCompressed).slice(1);
    const address = Buffer.concat([
      Buffer.from([0x41]),
      keccak256(pubComBuffer).slice(-20),
    ]);
    // baseCheck process
    const h1 = createHash("sha256").update(address).digest();
    // slice 4 byte from h2 beginning and add it to end of address
    const h2 = createHash("sha256").update(h1).digest().slice(0, 4);
    const baseCheck = Buffer.concat([address, h2]);
    // at the end we should convert address to base58 address
    return bs58.encode(baseCheck);
  };
})();
