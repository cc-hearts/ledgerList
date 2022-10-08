import React from 'react';
import './main.less';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background: linear-gradient(210deg, #6fb9f8, #3daaf85e, #49d3fc1a, #3fd3ff00);
`;

interface props {}

const App: React.FC<props> = function (props) {
  return <Container>{props.children}</Container>;
};

export default App;
