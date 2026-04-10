import { initClient } from '@ts-rest/core';
import type { ApiFetcherArgs } from '@ts-rest/core';
import axios from 'axios';
import { apiContract } from '@repo/contracts';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3999';

export const http = initClient<any, any>(apiContract as any, {
  baseUrl: apiBaseUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  api: async ({ method, path, headers, body, fetchOptions }: ApiFetcherArgs) => {
    const response = await axios.request({
      method,
      url: path,
      headers,
      data: body,
      signal: fetchOptions?.signal ?? undefined,
      validateStatus: () => true,
    });

    return {
      status: response.status,
      body: response.data,
      headers: new Headers(
        Object.entries(response.headers).flatMap<[string, string]>(
          ([key, value]) => {
            if (value === undefined) return [] as [string, string][];
          if (Array.isArray(value)) {
              return value.map((item) => [key, String(item)] as [string, string]);
          }
            return [[key, String(value)] as [string, string]];
          },
        ),
      ),
    };
  },
}) as any;
