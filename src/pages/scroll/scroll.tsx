/**
 * @author heart
 * @description hook形式重构
 * @Date 2022-03-12
 */

import React, { useCallback, useState, useEffect } from 'react';
import ScrollUi from '../../components/scroll/scrollUi';
import Less from './index.less';
interface props {}
const Scroll: React.FC<props> = function (props) {
  const [random, setRandom] = useState<number>(100);
  const [speed, setSpeed] = useState<number>(60);
  const [timer, setTimer] = useState<number>(30);
  useEffect(() => {
    const random = (Math.random() * 900 + 100) / speed;
    setRandom(random);
  }, []);
  const callback = useCallback(() => {
    const list: Array<React.ReactElement> = [
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-1']}>1</div>,
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-2']}>2</div>,
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-3']}>3</div>,
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-4']}>4</div>,
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-5']}>5</div>,
      <div className={'height-full width-400 margin-0-16 ' + Less['background-color-6']}>6</div>,
    ];
    return list;
  }, []);

  return (
    <div>
      <ScrollUi dom={callback} speed={60} />
    </div>
  );
};

export default Scroll;
