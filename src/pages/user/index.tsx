import Background from './background';
import UserInfo from './userInfo';
export default () => {
  return (
    <Background customStyle={{ position: 'relative' }}>
      <UserInfo />
    </Background>
  );
};
