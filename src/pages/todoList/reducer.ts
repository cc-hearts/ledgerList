// 应该用枚举类型
export enum rediEmum {
  CHECKED,
  UNCHECKED,
  ADDLIST,
  REMOVELIST,
}
import type { todoList, todoListAction } from '../../types/todoList';
export function reducer(state: Array<todoList> | null, action: todoListAction): Array<todoList> | null {
  if (!state) return null;
  switch (action.type) {
    case rediEmum.CHECKED: {
      if (action.index !== undefined) state[action.index].isFinish = true;
      return [...state];
    }
    case rediEmum.UNCHECKED: {
      if (action.index !== undefined) state[action.index].isFinish = false;
      return [...state];
    }
    case rediEmum.ADDLIST: {
      if (action.list) {
        if (action.list instanceof Array) {
          return [...state, ...action.list];
        } else {
          return [...state, action.list];
        }
      }
    }
    case rediEmum.REMOVELIST: {
      if (action.index !== undefined) state.splice(action.index, 1);
      return [...state];
    }
    default: {
      return state;
    }
  }
}

export function initReducer(arg: Array<todoList> | null) {
  return [
    {
      name: 'todo',
      isFinish: false,
    },
    {
      name: 'todo1',
      isFinish: true,
    },
  ];
}
