import Card from '@/components/card/index';
import styled from 'styled-components';
import { RightOutline } from 'antd-mobile-icons';

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
  { icon: 'icon-bianji', title: '用户信息修改' },
  { icon: 'icon-anquanyanzheng', title: '重置密码' },
  { icon: 'icon-renwu', title: '关于我们' },
];
const UserInfo = () => {
  return (
    <Container>
      <Card>
        <List>
          {list.map((val, index) => {
            const { title, icon } = val;
            return (
              <ListItem key={index}>
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

export default UserInfo;
