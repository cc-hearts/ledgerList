import React from 'react';
import Less from './index.less';
import TodoLi from './todoLi';
import type { todoList, todoListAction } from '../../types/todoList';
import { rediEmum } from './reducer';
interface props {
  todoList: Array<todoList> | null;
  disPatch: React.Dispatch<todoListAction>;
}
const TodoUi: React.FC<props> = function (props) {
  return (
    <ul className={Less['todo-list'] + ' margin-0-auto'}>
      {props.todoList !== null
        ? props.todoList.map((val, index) => {
            return (
              <TodoLi
                val={val}
                key={index + '_' + val.name}
                onClick={(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
                  props.disPatch({
                    type: val.isFinish ? rediEmum.UNCHECKED : rediEmum.CHECKED,
                    index,
                  });
                }}
              />
            );
          })
        : ''}
    </ul>
  );
};
export default TodoUi;
