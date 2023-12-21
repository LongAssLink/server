import ky from 'ky';

const api = ky.create({
  headers: {
    'X-Who': 'Web App 0.0.1'
  },
  prefixUrl: import.meta.env['BASE_URL'] ?? undefined
});

export interface ApiResponse<T> {
  ok: boolean;
  data: T | null;
  error?: string;
}

type LinkResponse = {
  id: string;
  dest: string;
  slug: string;
};

export type ApiResponses<T extends string> = {
  'api/link': ApiResponse<LinkResponse>;
  [key: string]: ApiResponse<unknown>;
}[T];

export default api;
