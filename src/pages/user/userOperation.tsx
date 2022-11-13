import Card from '@/components/card/index';
import styled from 'styled-components';
import { RightOutline } from 'antd-mobile-icons';
import { useCallback } from 'react';
import { history } from 'umi';
const Container = styled.div`
  width: 90%;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
`;

const List = styled.ul`
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  padding: 1rem var(--cell-padding-1);
  align-items: center;
  & > span {
    &:first-child {
      padding: 0 1.2rem;
    }

    &:not(:first-child) {
      flex: 1;
    }
  }
`;
const list = [
  { icon: 'icon-bianji', title: '用户信息修改', toRedirect: '/sub/userChange' },
  { icon: 'icon-anquanyanzheng', title: '重置密码' },
  { icon: 'icon-renwu', title: '关于我们' },
];
const OperationUser = () => {
  const toPath = useCallback((pathname) => {
    history.push(pathname);
  }, []);
  return (
    <Container>
      <Card>
        <List>
          {list.map((val, index) => {
            const { title, icon, toRedirect } = val;
            return (
              <ListItem key={index} onClick={() => toPath(toRedirect)}>
                <span className={`iconfont ${icon}`} style={{ fontSize: '24px' }}></span>
                <span>{title}</span>
                <RightOutline />
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Container>
  );
};

export default OperationUser;
