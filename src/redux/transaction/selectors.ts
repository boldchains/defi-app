import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTransaction = (state: RootState) => state.transaction;

export const transactionSelector = createSelector(
  selectTransaction,
  (state) => state,
);
