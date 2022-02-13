### address-generator

multi-currency wallet generator :

```typescript
import wallet from "address-generator";
// generate legacy address
wallet.bitcoin.getP2pkhAddress(pubKey, testnet);
// generate native segwit address (bech32)
wallet.bitcoin.getBech32AddressFromPubKey(pubKey, testnet);
// generate taproot address
wallet.bitcoin.getBech32AddressFromPubKey(pubKey, testnet);
//generate ethereum address
wallet.ethereum.publicToAddress(pubKey);
// generate tron address
wallet.tron.publicToAddress(pubKey);
```
