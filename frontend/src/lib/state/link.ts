import { atom } from 'jotai';

import { type ApiResponses } from '@/lib/api';

export const linkAtom = atom<ApiResponses<'api/link'> | null>(null);
