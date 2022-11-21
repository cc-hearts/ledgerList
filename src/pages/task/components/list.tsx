import React, { type Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState, type RefObject } from 'react';
import { deleteTask, getTaskList, type task } from '@/api/task';
import EditSvg from '@/assets/svg/edit.svg';
import DeleteSvg from '@/assets/svg/delete.svg';
import { noop } from '@/lib/shard';
import { TaskConstants } from '@/constants';
import RoleSvg from '@/assets/svg/role.svg';
import '@/assets/scss/task/list.scss';
import { catchErrorTip, successTips } from '@/utils/message';
import type { formRef, getDataRef } from '@/types/types';

const { getBasicLabel } = TaskConstants;

interface Props {
  getDataRef: Ref<getDataRef> | undefined;
  FormImplRef: RefObject<formRef>;
  showPopup: () => void;
}
const List: React.FC<Props> = ({ getDataRef, FormImplRef, showPopup = noop }) => {
  const [data, setData] = useState<any>(null);
  const list = useMemo(() => {
    if (data === null) return data;
    return Object.keys(data).map((val) => {
      return {
        label: val,
        children: data[val],
      };
    });
  }, [data]);
  const getData = useCallback(() => {
    getTaskList().then((res) => {
      setData(() => res.data?.list);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  useImperativeHandle(getDataRef, () => {
    return {
      getData,
    };
  });
  const handleEditTask = useCallback(
    (record: task) => {
      const { tag, content, date, uid, id } = record;
      showPopup();
      setTimeout(() => {
        FormImplRef?.current?.setType(() => 'edit');
        FormImplRef?.current?.setFieldsValue(
          {
            tag,
            content,
            date,
          },
          { uid, id },
        );
      }, 0);
    },
    [showPopup, FormImplRef],
  );
  const handleDeleteTask = useCallback(
    async (record: task) => {
      try {
        const data = await deleteTask({ id: record.id, uid: record.uid });
        successTips(data.message);
        getData();
      } catch (e) {
        catchErrorTip(e);
      }
    },
    [getData],
  );
  return (
    <>
      <div className="task__circle"></div>
      <div className="task__oCircle"></div>
      <div className="sub-title__wrapper">
        <h2 className="sub-title">TODO LIST</h2>
      </div>
      <div className="text-center">
        <img src={RoleSvg} />
      </div>
      {list &&
        list.map((item: { label: string; children: Array<task> }) => {
          return (
            <div className="task--wrapper" key={item.label}>
              <div className="task__title">{item.label}</div>
              {item.children instanceof Array &&
                item.children.map((record) => {
                  return (
                    <div className="task__card" key={record.id}>
                      <div className="task__container">
                        <div>{record.content}</div>
                        <span className="task__container--span">{getBasicLabel(record.tag)}</span>
                      </div>
                      <div className="task__operation">
                        <img src={EditSvg} alt="编辑" onClick={() => handleEditTask(record)} />
                        <img src={DeleteSvg} alt="删除" onClick={() => handleDeleteTask(record)} />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
};

export default List;
