import { isTask } from '../domain/task.js';

export const STORAGE_KEY = 'uniload.tasks.v1';

export function readTasks(storage) {
  let raw;
  try {
    raw = (storage ?? globalThis.localStorage).getItem(STORAGE_KEY);
  } catch {
    return { tasks: [], issue: 'read' };
  }
  if (raw === null) return { tasks: [], issue: null };

  try {
    const tasks = JSON.parse(raw);
    const valid = Array.isArray(tasks) && tasks.every(isTask)
      && new Set(tasks.map(task => task.id)).size === tasks.length;
    return valid ? { tasks, issue: null } : { tasks: [], issue: 'invalid' };
  } catch {
    return { tasks: [], issue: 'invalid' };
  }
}

export function writeTasks(tasks, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
