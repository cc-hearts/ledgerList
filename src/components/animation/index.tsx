import { useState, useEffect } from 'react';
import Less from './index.less';
interface props {
  content: string;
}
const AnimationText: React.FC<props> = function (props) {
  const [text, setText] = useState<Array<string>>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  useEffect(() => {
    const timer = setInterval(() => {
      if (text.length < props.content.length) {
        setText([...text, props.content[text.length]]);
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinish(true);
        }, 500);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [text]);
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
