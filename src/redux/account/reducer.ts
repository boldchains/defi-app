import { createReducer } from '@reduxjs/toolkit';
import { getWeakBalance } from './actions';

// declaring the types for our state
export type AccountState = {
  strongBalance?: string; // representing ETH balance
  weakBalance?: string; // representing DAI balance
};

const initialState: AccountState = {
  strongBalance: undefined,
  weakBalance: undefined,
};

export const accountReducer = createReducer(initialState, (builder) => {
  builder.addCase(getWeakBalance.fulfilled, (state, { payload }) => {
    state.weakBalance = payload;
  });
});

// exporting the reducer here, as we need to add this to the store
export default accountReducer;
