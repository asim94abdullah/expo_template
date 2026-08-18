import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import type { ApiError } from '@/src/types/api';

type TokenGetter = () => string | null;
type UnauthorizedHandler = () => void;

let getToken: TokenGetter = () => null;
let onUnauthorized: UnauthorizedHandler | null = null;

export function registerTokenGetter(getter: TokenGetter): void {
  getToken = getter;
}

export function registerUnauthorizedHandler(handler: UnauthorizedHandler): void {
  onUnauthorized = handler;
}

function getErrorMessage(error: AxiosError<ApiError>): string {
  return error.response?.data?.message ?? error.message ?? 'Something went wrong';
}

export function attachInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response?.status === 401) {
        onUnauthorized?.();
      }

      return Promise.reject(new Error(getErrorMessage(error)));
    },
  );
}
