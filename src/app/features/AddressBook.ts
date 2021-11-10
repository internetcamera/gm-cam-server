import isProd from './isProd';

// TODO: remove hard coding
export const OPENSEA_URL = isProd
  ? 'https://opensea.io/assets/matic/'
  : 'https://testnets.opensea.io/assets/mumbai/';

export const POLYGONSCAN_URL = isProd
  ? 'https://polygonscan.com/token/'
  : 'https://mumbai.polygonscan.com/token/';

export const GM_CAM_CONTRACT_ADDRESS = isProd
  ? "0xe198976e8c7bffae677a2e893a291ca215adb4c9"
  : "0x43Ace20d56057bc7eC02f91f4B6444Bbb89591D2";

export const FORWARDER_CONTRACT_ADDRESS = isProd
  ? '0xB27342C75118ac7f47F15BD9E8406e324C8c9b5E'
  : '0x2982263a9756006F45957082cADD1499E31eDde8';

export const RPC_PROVIDER = isProd
  ? 'https://polygon-mainnet.infura.io/v3/31cab49b254143188fc112a0c332ad86'
  : 'https://polygon-mumbai.infura.io/v3/31cab49b254143188fc112a0c332ad86';

export const L1_RPC_PROVIDER = isProd
  ? 'https://mainnet.infura.io/v3/31cab49b254143188fc112a0c332ad86'
  : 'https://mainnet.infura.io/v3/31cab49b254143188fc112a0c332ad86';

export const GRAPH_URL = isProd
  ? 'https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam'
  : 'https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam';

export const IPFS_URL: string = 'https://ipfs.internet.camera';
export const FORWARDER_URL: string = 'https://tx.internet.camera/api/forward';
