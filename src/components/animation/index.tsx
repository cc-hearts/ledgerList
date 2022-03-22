import React, { useState, useEffect, useCallback } from 'react';
import Less from './index.less';
interface props {
  content: string;
}
let timer: NodeJS.Timer;
type setType<T> = React.Dispatch<React.SetStateAction<T>>;
function animations(text: string[], setText: setType<Array<string>>, setIsFinish: setType<boolean>, totalLength: string, dialy: number = 6) {
  if (text.length < totalLength.length) {
    timer = setTimeout(() => {
      setText([...text, totalLength[text.length]]);
      // 延迟控制速度
    }, (1000 / 60) * dialy);
  } else {
    clearTimeout(timer);
    setIsFinish(true);
  }
}
const AnimationText: React.FC<props> = function (props) {
  const [text, setText] = useState<Array<string>>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  useEffect(() => {
    if (isFinish) {
      return;
    }
    requestAnimationFrame((tempSize) => {
      animations(text, setText, setIsFinish, props.content);
    });
  }, [text, timer]);
  return (
    <>
      <div style={{ display: 'inline-block' }} className={isFinish ? Less['cursor'] : Less['animation']}>
        <span>
          {text.map((x, index) => {
            return <span key={index}>{x}</span>;
          })}
        </span>
      </div>
    </>
  );
};

export default AnimationText;
