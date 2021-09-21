import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import { daiAbi } from './abi/dai';

const ERC20_ADDR = process.env.ERC20_ADDRESS || '';

/**
 * ERC20 Contract instance
 */
export function getERC20Contract(library?: Web3Provider) {
  return new Contract(ERC20_ADDR, daiAbi, library?.getSigner());
}
