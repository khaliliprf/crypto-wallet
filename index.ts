import bitcoin from "./src/bitcoin";
import tron from "./src/tron";
import ethereum from "./src/ethereum";

// export default new (class CryptoWallet {})();
const cryptoWallet = {
  bitcoin,
  ethereum,
  tron,
};

export default cryptoWallet;
