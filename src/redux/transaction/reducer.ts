import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { createReducer } from '@reduxjs/toolkit';
import { transferTx, waitTx } from './actions';

// declaring the types for our state
export type TransactionState = {
  pending?: boolean;
  confirming?: boolean;
  tx?: TransactionResponse;
  receipient?: TransactionReceipt;
  error?: Error;
};

const initialState: TransactionState = {
  confirming: false,
  pending: false,
  tx: undefined,
  error: undefined,
};

export const transactionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(transferTx.pending, (state) => {
      state.confirming = true;
    })
    .addCase(transferTx.fulfilled, (state, { payload }) => {
      state.tx = payload;
      state.confirming = false;
      state.pending = true;
    })
    .addCase(transferTx.rejected, (state, { payload }) => {
      state.confirming = false;
      state.error = payload as Error;
    })
    .addCase(waitTx.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.receipient = payload;
    });
});

// exporting the reducer here, as we need to add this to the store
export default transactionReducer;
