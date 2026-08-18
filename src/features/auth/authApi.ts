import { apiClient } from '@/src/api/client';
import { ENDPOINTS } from '@/src/api/endpoints';
import { CONFIG } from '@/src/constants/config';
import { delay } from '@/src/utils/helpers';
import type {
  AuthResponse,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
} from '@/src/features/auth/types';

async function mockSignIn(payload: SignInPayload): Promise<AuthResponse> {
  await delay(500);

  const name = payload.email.split('@')[0] ?? 'User';

  return {
    token: `mock-token-${Date.now()}`,
    user: {
      id: '1',
      name,
      email: payload.email.trim(),
    },
  };
}

async function mockSignUp(payload: SignUpPayload): Promise<AuthResponse> {
  await delay(500);

  return {
    token: `mock-token-${Date.now()}`,
    user: {
      id: '1',
      name: payload.name.trim(),
      email: payload.email.trim(),
    },
  };
}

export const authApi = {
  async signIn(payload: SignInPayload): Promise<AuthResponse> {
    if (CONFIG.useMockApi) {
      return mockSignIn(payload);
    }

    const { data } = await apiClient.post<AuthResponse>(ENDPOINTS.auth.signIn, payload);
    return data;
  },

  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    if (CONFIG.useMockApi) {
      return mockSignUp(payload);
    }

    const { data } = await apiClient.post<AuthResponse>(ENDPOINTS.auth.signUp, payload);
    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    if (CONFIG.useMockApi) {
      await delay(500);
      return;
    }

    await apiClient.post(ENDPOINTS.auth.forgotPassword, payload);
  },
};
