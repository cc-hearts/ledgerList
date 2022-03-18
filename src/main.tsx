import React from 'react';
import './assets/style/style.css';

interface props {}
const App: React.FC<props> = function (props) {
  return <>{props.children}</>;
};

export default App;
