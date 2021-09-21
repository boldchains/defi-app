import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAccount = (state: RootState) => state.account;

export const accountSelector = createSelector(selectAccount, (state) => state);
