import React, { useRef, useState, useEffect } from 'react';
import ScrollLi from '../../components/scroll/ScrollLi';
interface props extends scroll {
  dom(): Element[] | JSX.Element[];
}

const ScrollUi: React.FC<props> = function (props) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (ref.current && ref.current.scrollWidth) {
      setWidth(ref.current.scrollWidth);
    }
  }, []);
  return (
    <ul
      className="flex flex-no-warp  text-align-center width-full  height-full"
      ref={ref}
    >
      {props.dom().map((x, index) => {
        return (
          <ScrollLi
            dom={x}
            key={index}
            width={width}
            speed={props.speed}
            random={props.random}
            timer={props.timer}
          />
        );
      })}
    </ul>
  );
};
export default ScrollUi;
