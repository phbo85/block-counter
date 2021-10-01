import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
  56: 'https://bsc-dataseed.binance.org/',
  137: 'https://rpc-mainnet.matic.network',
};

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 56: RPC_URLS[56], 137: RPC_URLS[137] },
  defaultChainId: 1,
  pollingInterval: POLLING_INTERVAL,
});

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137],
});
