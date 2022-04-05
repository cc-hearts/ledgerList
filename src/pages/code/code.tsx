/**
 * @author heart
 * @description 打字机模式
 * @Date 2022-04-05
 */

interface props {}
let isCode = false; // 标识是否完成了
let str = 'hello world!';
function splitCode(string: string, tempCode: string): string {
  if (tempCode.length < string.length) {
    return string.substring(0, tempCode.length + 1);
  } else {
    isCode = true;
  }

  return string.substring(0, tempCode.length - 1);
}
function reserveSplitCode(string: string, tempCode: string): string {
  if (tempCode.length > 0) {
    return tempCode.substring(0, tempCode.length - 1);
  } else {
    isCode = false;
  }
  return string.substring(0, tempCode.length + 1);
}
import { useRef, useEffect, useState } from 'react';
const codeAnimation: React.FC<props> = (props) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<string>('');
  useEffect(() => {
    let timer: any = null;
    timer = requestAnimationFrame(() => {
      if (code !== str && code !== '') {
        setTimeout(() => {
          setCode((isCode ? reserveSplitCode : splitCode)(str, code));
        }, 66);
      } else {
        setTimeout(() => {
          setCode((isCode ? reserveSplitCode : splitCode)(str, code));
        }, 2000);
      }
    });
    return () => {
      cancelAnimationFrame(timer);
    };
    // setCode('1');
    // 刷新3次的原因 开始渲染 之后走useEffect 之后 setCode 之后 再次渲染 之后useEffect对比了不同 又setCode了一次
    // 只有setCode之后才会渲染
  }, [code]);
  return (
    <>
      <span ref={codeRef}>{code}</span>
    </>
  );
};

export default codeAnimation;
