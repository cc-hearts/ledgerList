/**
 * @author heart
 * @description 辅助功能
 * @Date 2022-10-21
 */
import styled from 'styled-components';
import { EditSOutline } from 'antd-mobile-icons';
import { useCallback, useRef } from 'react';
import { noop } from '@/lib/shard';
import { getRootFontSize, getSafeButton } from '@/utils/safe';
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color, #db5d52);
  position: fixed;
  bottom: calc(5rem + constant(safe-area-inset-bottom));
  bottom: calc(5rem + env(safe-area-inset-bottom));
  right: 0.5rem;
`;
const Auxiliary = ({ icon: ComponentIcon = EditSOutline, fontSize = '24px', color = '#fff', callback = noop }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const coordinate = useRef<{ x: number; y: number; left: number; top: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: NaN,
    top: NaN,
  });
  const disabledScroll = useCallback((e: TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }
  }, []);
  const handleTouchStart = () => {
    const data = buttonRef.current?.getBoundingClientRect?.();
    if (data) {
      coordinate.current.x = data.left + data.width / 2;
      coordinate.current.y = data.top + data.height / 2;
      coordinate.current.width = data.width / 2;
      coordinate.current.height = data.height / 2;
      if (coordinate.current) {
        Number.isNaN(coordinate.current.left) && (coordinate.current.left = data.left);
        Number.isNaN(coordinate.current.top) && (coordinate.current.top = data.top);
      }
    }
    document.body.addEventListener('touchmove', disabledScroll, { passive: false }); //passive 参数不能省略，用来兼容ios和android
    document.body.setAttribute('style', 'overflow-y:hidden');
  };
  const handleTouchEnd = () => {
    // 判断width值
    document.body.removeEventListener('touchmove', disabledScroll);
    const rect = buttonRef.current?.getBoundingClientRect?.();
    if (rect) {
      const isLeft = rect?.left < screen.width / 2;
      // 下边界情况判定
      if (buttonRef.current && coordinate.current) {
        buttonRef.current.setAttribute(
          'style',
          `transition:all 300ms cubic-bezier(0.36, 1, 0.58, 1);
          transform: translate(${isLeft ? 0 - coordinate.current.left : 0}px,${(rect.top < 0 ? 0 : rect.top) - coordinate.current.top}px)`,
        );
      }
    }
    document.body.removeAttribute('style');
  };

  const offsetTabBar = useCallback(() => {
    // TODO: 48 是底部的高度 后续替换
    const height = window.innerHeight - getSafeButton() - coordinate.current.top - coordinate.current.height * 2 - 56;
    return height;
  }, []);
  const buttonSafeArea = useCallback(
    (offsetTop: number) => {
      return offsetTabBar() - offsetTop;
    },
    [offsetTabBar],
  );

  const handleTouchMove = (e: any) => {
    const coor = e.nativeEvent.changedTouches[0];
    if (buttonRef.current && coor && coordinate.current) {
      // pageX - scrollX = clientX
      const offsetTop = coor.clientY - coordinate.current?.top - coordinate.current.height - (getSafeButton() ? getRootFontSize() * 3 : 0);
      buttonRef.current.setAttribute(
        'style',
        `transform: translate(${coor.clientX - coordinate.current?.left - coordinate.current.width}px,${
          // TODO: chrome 底部工具栏的高度为46px 如何判断是否弹出了底部的工具栏
          buttonSafeArea(offsetTop) <= 0 ? offsetTabBar() : offsetTop
        }px)`,
      );
    }
    return false;
  };

  const handleClick = () => {
    callback instanceof Function && callback();
  };
  return (
    <>
      <Button ref={buttonRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onClick={handleClick}>
        <ComponentIcon color={color} fontSize={fontSize} />
      </Button>
    </>
  );
};

export default Auxiliary;
