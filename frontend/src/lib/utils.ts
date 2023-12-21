import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A better clsx (includes tailwind-merge)
 * @param inputs list of classes
 * @returns merged list of classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_BASE_SHORT = `longasslink.com/s/`;
export const SITE_BASE = `https://${SITE_BASE_SHORT}`;
