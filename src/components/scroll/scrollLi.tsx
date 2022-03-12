import React, { useEffect, useRef, useState } from 'react';
interface props extends scroll {
  dom: Element | JSX.Element;
  width: number;
}
const ScrollLi: React.FC<props> = function (props) {
  const refs = useRef<HTMLLIElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [transition, setTransition] = useState<number>(0);
  const [childrenLeft, setChildrenLeft] = useState<number>(0);
  const [chidrenRights, setchidrenRights] = useState<number>(0);
  useEffect(() => {
    if (refs.current) {
      setChildrenLeft(refs.current.offsetLeft);
      setchidrenRights(
        props.width - refs.current.offsetLeft - refs.current.offsetWidth,
      );
      setWidth(refs.current.offsetWidth);
    }
  }, [props.width]);
  useEffect(() => {
    const timer = setInterval(() => {
      let number = 0;
      if (-(1 + childrenLeft / width) * 100 > transition) {
        number = (chidrenRights / width) * 100;
      } else {
        number = transition;
        number -= props.random / 30;
      }
      setTransition(number);
    }, props.timer);
    return () => clearInterval(timer);
  }, [transition, props.speed, props.random, props.timer]);

  return (
    <li
      ref={refs}
      className="flex-1"
      style={{ transform: `translateX(${transition}%) translateZ(0)` }}
    >
      {props.dom}
    </li>
  );
};
export default ScrollLi;
