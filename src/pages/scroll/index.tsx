import React from 'react';
import ScrollComponent from '../../components/scroll/index';
import Less from './index.less';
const SrcollComponent: React.FC<{}> = function () {
  const list: Array<React.ReactElement> = [
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-1']}
    >
      1
    </div>,
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-2']}
    >
      2
    </div>,
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-3']}
    >
      3
    </div>,
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-4']}
    >
      4
    </div>,
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-5']}
    >
      5
    </div>,
    <div
      className={'height-full w-400 margin-0-16 ' + Less['background-color-6']}
    >
      6
    </div>,
  ];
  return (
    <>
      <ScrollComponent listImg={list} speed={1000} />
    </>
  );
};

export default SrcollComponent;
