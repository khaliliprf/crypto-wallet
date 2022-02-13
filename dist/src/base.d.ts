/// <reference types="node" />
declare const bs58: {
    encode: (source: any) => any;
    decodeUnsafe: (source: any) => Buffer | undefined;
    decode: (string: any) => Buffer;
};
export default bs58;
