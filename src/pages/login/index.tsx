import Title from './components/title';
import Login from './components/login';
import '@/assets/scss/login/index.scss';
export default () => {
  return (
    <div className="login-wrapper">
      <Title />
      <Login />
    </div>
  );
};
