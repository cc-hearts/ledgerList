/**
 * @author heart
 * @description 图片文字滚动
 * @Date 2022-03-10
 */
//TODO:按钮控制 开始 以及关闭功能
// ts 能否推断出子元素的集合的类型
// 考虑拆分li组件完成 简洁的代码

// 优化掉帧问题
import React, { useRef, useEffect } from 'react';
interface props {
  listImg: Array<React.ReactElement>;
  speed: number;
}
function initialString(num?: number): string {
  if (num === undefined) {
    return 'translateX(0.00%) translateZ(0)';
  }
  // random 获取 100-999的数据
  return `translateX(${num}%) translateZ(0)`;
}
const initWidth: Array<number> = [];
let parentWidth: Array<number> = [];
let initSpeed: Array<number> = [];
let longRequest: number | null = null;
let timer: NodeJS.Timer | null = null;
function addsSrollEvents<T extends React.MutableRefObject<any>>(dom: T): void {
  if (dom === null) return;
  // 给每个元素添加滚动事件
  for (let i = 0; i < dom.current.children.length; i++) {
    if (dom.current.children[i].style.transform === '') {
      dom.current.children[i].style.transform = initialString();
    } else {
      const string = dom.current.children[i].style.transform;
      const reg = /X\(\s*(\-*\d*\.*\d*)%/;
      if (reg.test(string)) {
        const regex = RegExp.$1;
        const num = Number.parseFloat(regex) - initSpeed[i];
        dom.current.children[i].style.transform = initialString(num < initWidth[i] ? parentWidth[i] : num);
      }
    }
  }
  timer = setTimeout(() => {
    longRequest = requestAnimationFrame(() => {
      addsSrollEvents(dom);
    });
  }, 10);
}
// 初始化计算滚动的宽度
function initScrollWidth<T extends React.MutableRefObject<HTMLElement | null>>(dom: T, speed: number): void {
  if (dom === null) return;
  if (dom && dom.current) {
    for (let i = 0; i < dom.current.children.length; i++) {
      const childrenWidth: number = (dom.current.children[i] as HTMLElement).offsetWidth;
      // 百分比以自身为中心
      const childrenLeft = (dom.current.children[i] as HTMLElement).offsetLeft;
      const childRight = dom.current.scrollWidth - (dom.current.children[i] as HTMLElement).offsetLeft - childrenWidth;
      initWidth.push((((childrenLeft + childrenWidth) * 100) / childrenWidth) * -1);
      initSpeed.push(speed / childrenWidth);
      parentWidth.push((childRight * 100) / childrenWidth);
    }
  }
}
function clearScrollEvent<T>(dom: T): void {}
const SrcollComponent: React.FC<props> = function (props) {
  const { listImg } = props;
  const refContainer = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    initScrollWidth<typeof refContainer>(refContainer, props.speed);
  }, [props.listImg.length, props.speed]);
  useEffect(() => {
    addsSrollEvents<typeof refContainer>(refContainer);
    return () => {
      clearScrollEvent(refContainer);
    };
  }, []);
  return (
    <>
      <ul className="flex flex-no-warp position-relative overflow-hidden text-align-center width-full  height-full" ref={refContainer}>
        {listImg.map((x, index) => {
          return (
            <li key={index} className="flex-1">
              {x}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SrcollComponent;
