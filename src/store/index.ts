import { configureStore } from '@reduxjs/toolkit';

import { registerTokenGetter, registerUnauthorizedHandler } from '@/src/api/interceptors';
import { signOut } from '@/src/features/auth/authSlice';
import { rootReducer } from '@/src/store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

registerTokenGetter(() => store.getState().auth.token);

registerUnauthorizedHandler(() => {
  void store.dispatch(signOut());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
