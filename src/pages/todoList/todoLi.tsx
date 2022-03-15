import React, { useState } from 'react';
import Less from './index.less';
import type { todoList } from '../../types/todoList';
interface props {
  val: todoList;
  onClick(event: React.MouseEvent | React.ChangeEvent<HTMLInputElement>): void;
}
// react 绑定函数会不会内存泄漏
const TodoLi: React.FC<props> = function (props) {
  return (
    <li
      className={Less['check-list'] + ' border-1 '}
      onClick={(e) => {
        props.onClick(e);
      }}
    >
      <input
        type="radio"
        checked={props.val.isFinish}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
      />
      <span>{props.val.name}</span>
    </li>
  );
};

export default TodoLi;
