import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const RPC_URLS: { [chainId: number]: string } = {
  3: process.env.RPC_URL_3 as string,
};

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Ganache: 1337,
};

export const injected = new InjectedConnector({
  supportedChainIds: [Networks.Ropsten],
});

export const network = new NetworkConnector({
  urls: { 3: RPC_URLS[3] },
  defaultChainId: Networks.Ropsten,
});
