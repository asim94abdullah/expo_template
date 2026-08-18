import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '@/src/constants/config';
import { authApi } from '@/src/features/auth/authApi';
import type {
  AuthResponse,
  AuthState,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
  User,
} from '@/src/features/auth/types';
import { storageService } from '@/src/services/storageService';

const initialState: AuthState = {
  user: null,
  token: null,
  isHydrated: false,
  isLoading: false,
  error: null,
};

async function persistSession(session: AuthResponse): Promise<void> {
  await Promise.all([
    storageService.setItem(STORAGE_KEYS.authToken, session.token),
    storageService.setItem(STORAGE_KEYS.authUser, JSON.stringify(session.user)),
  ]);
}

async function clearSession(): Promise<void> {
  await Promise.all([
    storageService.removeItem(STORAGE_KEYS.authToken),
    storageService.removeItem(STORAGE_KEYS.authUser),
  ]);
}

export const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
  const [token, userJson] = await Promise.all([
    storageService.getItem(STORAGE_KEYS.authToken),
    storageService.getItem(STORAGE_KEYS.authUser),
  ]);

  if (!token || !userJson) {
    return { token: null, user: null };
  }

  return {
    token,
    user: JSON.parse(userJson) as User,
  };
});

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: SignInPayload) => {
    const session = await authApi.signIn(payload);
    await persistSession(session);
    return session;
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload) => {
    const session = await authApi.signUp(payload);
    await persistSession(session);
    return session;
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (payload: ForgotPasswordPayload) => {
    await authApi.forgotPassword(payload);
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await clearSession();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isHydrated = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isHydrated = true;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to sign in';
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to sign up';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unable to send reset email';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
