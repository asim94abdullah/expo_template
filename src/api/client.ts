import axios from 'axios';

import { attachInterceptors } from '@/src/api/interceptors';
import { CONFIG } from '@/src/constants/config';

export const apiClient = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  timeout: CONFIG.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(CONFIG.apiKey ? { 'x-api-key': CONFIG.apiKey } : {}),
  },
});

attachInterceptors(apiClient);
