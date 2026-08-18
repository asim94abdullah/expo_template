function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value == null || value === '') {
    return fallback;
  }

  return value === 'true';
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

export const CONFIG = {
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  apiTimeoutMs: parseNumber(process.env.EXPO_PUBLIC_API_TIMEOUT_MS, 15_000),
  useMockApi: parseBoolean(process.env.EXPO_PUBLIC_USE_MOCK_API, true),
  apiKey: process.env.EXPO_PUBLIC_API_KEY ?? '',
} as const;

export const STORAGE_KEYS = {
  authToken: 'auth_token',
  authUser: 'auth_user',
} as const;
