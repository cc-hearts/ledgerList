import React, { useReducer, useState } from 'react';
import TodoUi from './todoUi';
import { reducer, initReducer } from './reducer';
import { rediEmum } from './reducer';
const Todo: React.FC = function () {
  const [num, setNum] = useState<number>(0);
  const [todoList, disPatchList] = useReducer(reducer, null, initReducer);
  return (
    <div>
      <TodoUi todoList={todoList} disPatch={disPatchList} />
      <div>
        <button
          onClick={() => {
            disPatchList({
              type: rediEmum.ADDLIST,
              list: {
                name: '新增的元素',
                isFinish: false,
              },
            });
          }}
        >
          添加list
        </button>
        <input
          type="number"
          value={num}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNum(Number.parseInt((e.target as HTMLInputElement).value));
          }}
        />
        <button
          onClick={() => {
            if (todoList && num >= 0 && num < todoList.length) {
              disPatchList({
                type: rediEmum.REMOVELIST,
                index: num,
              });
            }
          }}
        >
          删除list
        </button>
      </div>
    </div>
  );
};

export default Todo;
