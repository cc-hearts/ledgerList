/**
 * @author heart
 * @description 图片文字滚动
 * @Date 2022-03-10
 */

import React, { useRef, useEffect } from 'react';
interface props {
  listImg: Array<React.ReactElement>;
  speed: number;
}
function initialString(num?: number): string {
  if (num === undefined) {
    return 'translateX(0.00%) translateZ(0px)';
  }
  // random 获取 100-999的数据
  return `translateX(${num}%) translateZ(0px)`;
}
const initWidth: Array<number> = [];
let parentWidth: Array<number> = [];
function addsSrollEvents<T extends React.MutableRefObject<any>>(
  dom: T,
  speed: number,
): void {
  if (dom === null) return;
  // 给每个元素添加滚动事件
  setInterval(() => {
    // speed决定速度
    const random = (Math.random() * 900 + 100) / speed;
    for (let i = 0; i < dom.current.children.length; i++) {
      if (dom.current.children[i].style.transform === '') {
        dom.current.children[i].style.transform = initialString();
      } else {
        const string = dom.current.children[i].style.transform;
        const reg = /X\(\s*(\-*\d*\.*\d*)%/;
        if (reg.test(string)) {
          const regex = RegExp.$1;
          const num = Number.parseFloat(regex) - random;
          dom.current.children[i].style.transform = initialString(
            num < initWidth[i] ? parentWidth[i] : num,
          );
        }
      }
    }
  }, 100);
}
// 初始化计算滚动的宽度
function initScrollWidth<T extends React.MutableRefObject<any>>(dom: T): void {
  if (dom === null) return;
  // parentWidth = Number.parseFloat(dom.current.offsetWidth);
  for (let i = 0; i < dom.current.children.length; i++) {
    const childrenWidth: number = Number.parseFloat(
      dom.current.children[i].offsetWidth,
    );
    // 百分比以自身为中心
    const childrenLeft = Number.parseFloat(dom.current.children[i].offsetLeft);
    const childRight =
      Number.parseFloat(dom.current.scrollWidth) -
      Number.parseFloat(dom.current.children[i].offsetLeft) -
      childrenWidth;
    initWidth.push(
      (((childrenLeft + childrenWidth) * 100) / childrenWidth) * -1,
    );
    parentWidth.push((childRight * 100) / childrenWidth);
  }
}
function clearScrollEvent<T>(dom: T): void {}
const SrcollComponent: React.FC<props> = function (props) {
  const { listImg } = props;
  const refContainer = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    initScrollWidth<typeof refContainer>(refContainer);
    addsSrollEvents<typeof refContainer>(refContainer, props.speed);
    return () => {
      clearScrollEvent(refContainer);
    };
  }, []);
  return (
    <>
      <ul
        className="flex flex-shrink overflow-hidden text-align-center width-full flex-no-warp h-100"
        ref={refContainer}
      >
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
