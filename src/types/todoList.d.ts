import { rediEmum } from '../pages/todoList/reducer';
export declare interface todoList {
  name: string;
  isFinish: boolean;
}
type actionType = rediEmum;
export interface todoListAction {
  type: actionType;
  index?: number;
  list?: todoList | todoList[];
}
