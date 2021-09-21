import { Web3Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getERC20Contract } from '../../context/contracts';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const transferTx = createAsyncThunk(
  'transaction/transferTx',
  async ({
    library,
    transferTo,
    amount,
  }: {
    library?: Web3Provider;
    transferTo: string;
    amount: string;
  }) => {
    const contract = getERC20Contract(library);
    return await contract.transfer(transferTo, parseEther(amount));
  },
);

export const waitTx = createAsyncThunk(
  'transaction/waitTx',
  async (tx: TransactionResponse) => {
    return await tx.wait();
  },
);
