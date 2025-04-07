import { TStorageKeys } from '@/models/types/auth.type';

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const getLocalStorage = <T>(
  key: TStorageKeys,
  defaultValue: null | T = null,
): null | T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    if (typeof item === 'string') return item as T;

    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

export const removeLocalStorage = (key: TStorageKeys): void => {
  localStorage.removeItem(key);
};

export const setLocalStorage = <T>(key: TStorageKeys, value: T): void => {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
