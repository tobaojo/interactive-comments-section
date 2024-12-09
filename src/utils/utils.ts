import { type User, type Comment } from "../types/types";

export function saveToLocalStorage(key: string, data: User | Comment) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error parsing localStorage data for key "${key}":`, error);
    return null;
  }
}
