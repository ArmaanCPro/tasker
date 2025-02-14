import { writable } from 'svelte/store';
import type { Task } from '$lib/types/task';

// Helper function to get data from localStorage
function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof localStorage === 'undefined') return defaultValue; // Avoid errors during SSR (server-side rendering)
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : defaultValue;
}

// Helper function to save data to localStorage
function saveToLocalStorage<T>(key: string, value: T): void {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Create writable store with localStorage synchronization
export const tasks = writable<Task[]>(getFromLocalStorage<Task[]>('tasks', []));

// Subscribe to store updates and save them to localStorage
tasks.subscribe((value) => saveToLocalStorage('tasks', value));