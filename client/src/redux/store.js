import { configureStore } from '@reduxjs/toolkit';
import reducer from './userSlice';
import msgSlice from './msgSlice';

export const store = configureStore({
  reducer: {
    user: reducer,
    message: msgSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //  disables the non-serializable warnings
    }),
});
