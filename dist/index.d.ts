/// <reference types="node" />
declare const _default: {
    bitcoin: {
        getBech32AddressFromPubKey(compressedPubKey: string, testnet?: boolean): any;
        getTaprootAddress(prvKey: any, testnet: any): string;
        getP2pkhAddress(pubKey: Buffer, testnet?: boolean): any;
        getPrivateKeyInWifFormat(privateKey: Buffer): any;
        retrieveAddressFromPvInWifFormat(wifPv: string): any;
        convertWifPvToHex(wifPv: string): any;
    };
    ethereum: {
        publicToAddress(publicKey: Buffer): string;
    };
    tron: {
        publicToAddress: (publicKey: Buffer) => any;
    };
};
export default _default;
