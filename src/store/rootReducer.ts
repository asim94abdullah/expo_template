import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/src/features/auth/authSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
