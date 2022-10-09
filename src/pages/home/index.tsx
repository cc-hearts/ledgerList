import Title from './title';
import Login from './login';
import styled from 'styled-components';
const Container = styled.div`
  overflow: scroll;
  background: linear-gradient(210deg, #6fb9f8, #3daaf85e, #49d3fc1a, #3fd3ff00);
`;
export default () => {
  return (
    <Container>
      <Title />
      <Login />
    </Container>
  );
};
