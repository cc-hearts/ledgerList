import React, { useReducer, useState } from 'react';
import TodoUi from './todoUi';
import { reducer, initReducer } from './reducer';
import { rediEmum } from './reducer';
import { Button, Input } from 'antd';
const { TextArea } = Input;
const Todo: React.FC = function () {
  const [num, setNum] = useState<number>(0);
  const [context, setContext] = useState<string | undefined>(undefined);
  const [todoList, disPatchList] = useReducer(reducer, null, initReducer);

  return (
    <div className="flex">
      <TodoUi todoList={todoList} disPatch={disPatchList} />
      <div>
        <div>
          <TextArea
            placeholder="需要添加的todoList的内容"
            value={context}
            onChange={(e: React.ChangeEvent) => {
              if (e.target instanceof HTMLTextAreaElement) {
                setContext(e.target.value || '');
              }
            }}
          />
          <Button
            onClick={() => {
              disPatchList({
                type: rediEmum.ADDLIST,
                list: {
                  name: context ? context : '',
                  isFinish: false,
                },
              });
            }}
          >
            添加list
          </Button>
        </div>
        <div>
          <div>
            <Input
              type="number"
              value={num}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNum(Number.parseInt((e.target as HTMLInputElement).value));
              }}
            />
          </div>
          <Button
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
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
