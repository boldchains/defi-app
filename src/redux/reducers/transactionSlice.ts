import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// declaring the types for our state
export type TransactionState = {
  value: number;
};

const initialState: TransactionState = {
  value: 0,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  reducers: {
    transfer: (state) => {},
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { transfer } = transactionSlice.actions;

// calling the above actions would be useless if we could not access the data in the state.
// So, we use something called a selector which allows us to select a value from the state.
export const selectCount = (state: RootState) => state.transaction.value;

// exporting the reducer here, as we need to add this to the store
export default transactionSlice.reducer;
