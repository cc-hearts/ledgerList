import Background from './components/background';
import UserOperation from './components/userOperation';
import LogoutButton from './components/logout';
import User from './components/user';
export default () => {
  return (
    <Background customStyle={{ position: 'relative' }}>
      <User />
      <UserOperation />
      <LogoutButton />
    </Background>
  );
};
