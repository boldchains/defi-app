import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import accountReducer from './account/reducer';
import transactionReducer from './transaction/reducer';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
