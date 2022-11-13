import Background from './background';
import UserOperation from './userOperation';
import LogoutButton from './logout';
import User from './user';
export default () => {
  return (
    <Background customStyle={{ position: 'relative' }}>
      <User />
      <UserOperation />
      <LogoutButton />
    </Background>
  );
};
