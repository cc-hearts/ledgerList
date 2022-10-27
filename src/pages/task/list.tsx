import React, { type Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState, type RefObject } from 'react';
import { deleteTask, getTaskList, type task } from './service';
import type { formRef, getDataRef } from './types';
import styled from 'styled-components';
import EditSvg from '@/assets/svg/edit.svg';
import DeleteSvg from '@/assets/svg/delete.svg';
import { noop } from '@/lib/shard';
import { getBasicLabel } from './constant';
import RoleSvg from '@/assets/svg/role.svg';
import { catchErrorTip, successTips } from '@/utils/message';
const CardWrapper = styled.div`
  padding: 1rem;
`;

const Card = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Container = styled.div`
  flex: 1;
  & div {
    padding: 0.2rem;
    font-size: 1rem;
  }
`;

const Operation = styled.div`
  width: 3.5rem;
  display: flex;
  margin-right: 0.5rem;
  justify-content: space-between;
`;

const Tag = styled.span`
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  background-color: var(--primary-background, #3a3a3a);
  color: var(--primary-color, #aac8e4);
`;
const SubTitle = styled.h2`
  text-align: center;
  margin: 4rem 0;
`;

const SubTitleWrapper = styled.div`
  overflow: hidden;
`;

const Circle = styled.div`
  position: absolute;
  left: -22%;
  top: -3%;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: #ff6d6d;
  mix-blend-mode: multiply;
`;
const OCircle = styled(Circle)`
  left: -5%;
  top: -13%;
`;

const Wrapper = styled.div`
  text-align: center;
`;

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
      <Circle></Circle>
      <OCircle></OCircle>
      <SubTitleWrapper>
        <SubTitle>TODO LIST</SubTitle>
      </SubTitleWrapper>
      <Wrapper>
        <img src={RoleSvg} />
      </Wrapper>
      {list &&
        list.map((item: { label: string; children: Array<task> }) => {
          return (
            <CardWrapper key={item.label}>
              <Title>{item.label}</Title>
              {item.children instanceof Array &&
                item.children.map((record) => {
                  return (
                    <Card key={record.id}>
                      <Container>
                        <div>{record.content}</div>
                        <Tag>{getBasicLabel(record.tag)}</Tag>
                      </Container>
                      <Operation>
                        <img src={EditSvg} alt="编辑" onClick={() => handleEditTask(record)} />
                        <img src={DeleteSvg} alt="删除" onClick={() => handleDeleteTask(record)} />
                      </Operation>
                    </Card>
                  );
                })}
            </CardWrapper>
          );
        })}
    </>
  );
};

export default List;
