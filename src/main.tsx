import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

interface props {
  children?: React.ReactNode;
}

const App: React.FC<props> = function (props) {
  return <Container>{props.children}</Container>;
};

export default App;
