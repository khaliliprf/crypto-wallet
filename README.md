### address-generator

multi-currency wallet generator :

```typescript
import wallet from "address-generator";
// generate legacy address
wallet.bitcoin.getP2pkhAddress(pubKey, testnet);
// generate native segwit address (bech32)
wallet.bitcoin.getBech32AddressFromPubKey(pubKey, testnet);
// generate taproot address
wallet.bitcoin.getTaprootAddress(pubKey, testnet);
// convert private key from Buffer to WIF format
wallet.bitcoin.getPrivateKeyInWifFormat(prvKey);
// get private key and return account address
wallet.bitcoin.retrieveAddressFromPvInWifFormat(wifPv);
// convert WIF private key to HEX
wallet.bitcoin.convertWifPvToHex(wifPv);
//generate ethereum address
wallet.ethereum.publicToAddress(pubKey);
// generate tron address
wallet.tron.publicToAddress(pubKey);
```
