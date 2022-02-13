/// <reference types="node" />
declare const _default: {
    /**
     * @description take public key and return associated address
     *  address in ethereum is 20 byte
        address in hex is 40 characters
       .publicKeyConvert(publicKey: Uint8Array, compressed: boolean = true, output: Uint8Array | ((len: number) => Uint8Array) = (len) => new Uint8Array(len)): Uint8Array
      // Reserialize public key to another format
     * @param publicKey
     * @returns address
     */
    publicToAddress(publicKey: Buffer): string;
};
export default _default;
