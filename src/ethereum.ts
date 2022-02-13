import secp256K1 from "secp256k1";
import keccak256 from "keccak256";

export default new (class Ethereum {
  /**
   * @description take public key and return associated address
   *  address in ethereum is 20 byte
      address in hex is 40 characters
     .publicKeyConvert(publicKey: Uint8Array, compressed: boolean = true, output: Uint8Array | ((len: number) => Uint8Array) = (len) => new Uint8Array(len)): Uint8Array
    // Reserialize public key to another format
   * @param publicKey
   * @returns address
   */
  publicToAddress(publicKey: Buffer): string {
    const publicCompressed = secp256K1.publicKeyConvert(publicKey, false),
      pubComBuffer = Buffer.from(publicCompressed).slice(1),
      address = Buffer.from(keccak256(pubComBuffer).slice(-20)),
      hexAddress = address.toString("hex").toLowerCase(),
      hash = keccak256(hexAddress).toString("hex");
    let checksum = "0x";
    for (let i = 0; i < String(hexAddress).length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        checksum += String(hexAddress[i]).toUpperCase();
      } else {
        checksum += hexAddress[i];
      }
    }
    return checksum;
  }
})();
