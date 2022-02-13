/// <reference types="node" />
declare const _default: {
    getBech32AddressFromPubKey(compressedPubKey: string, testnet?: boolean): any;
    getTaprootAddress(prvKey: any, testnet: any): string;
    getP2pkhAddress(pubKey: Buffer, testnet?: boolean): any;
    getPrivateKeyInWifFormat(privateKey: Buffer): any;
    retrieveAddressFromPvInWifFormat(wifPv: string): any;
    convertWifPvToHex(wifPv: string): any;
};
export default _default;
