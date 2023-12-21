import { atom } from 'jotai';
import { ApiResponse } from '../api';

export const linkAtom = atom<ApiResponse<{
  id: string;
  dest: string;
  slug: string;
}> | null>(null);
