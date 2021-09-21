import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getERC20Contract } from '../../context/contracts';

export const getWeakBalance = createAsyncThunk(
  'account/getWeakBalance',
  async ({
    library,
    account,
  }: {
    library: Web3Provider | undefined;
    account: string | undefined | null;
  }) => {
    const contract = getERC20Contract(library);
    const weak: BigNumber = await contract.balanceOf(account);
    return formatEther(weak);
  },
);
