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

export default api;
