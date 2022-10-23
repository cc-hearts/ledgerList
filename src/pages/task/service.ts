import { Get, Post } from '@/utils/request';

export function addTask<T extends params = { tag: string; content: string; date: string }>(data: T) {
  return Post('api/task/createTask', data);
}

export type task = {
  id: number;
  uid: number;
  content: string;
  tag: string;
  date: string;
};

export function getTaskList() {
  return Get<{ list: Record<string, Array<task>>; total: number }>('api/task/getTaskById');
}

export type editTask = {
  id: number;
  content: string;
  tag: string;
  uid: number;
  date: string;
};

export function editTask<T extends params = editTask>(data: T) {
  return Post<string>('api/task/editTask', data);
}

export function deleteTask<T extends params = { uid: number; id: number }>(data: T) {
  return Post('api/task/deleteTask', data);
}
