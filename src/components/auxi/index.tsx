/**
 * @author heart
 * @description 辅助功能
 * @Date 2022-10-21
 */
import styled from 'styled-components';
import { EditSOutline } from 'antd-mobile-icons';
import { useRef } from 'react';
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color, #db5d52);
  position: fixed;
  bottom: calc(2rem + 44px);
  right: 0.5rem;
`;
const Auxiliary = ({ icon: ComponentIcon = EditSOutline, fontSize = '24px', color = '#fff' }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const coordinate = useRef<{ x: number; y: number; left: number; top: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: NaN,
    top: NaN,
  });
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
    document.body.setAttribute('style', 'overflow-y:hidden');
  };
  const handleTouchEnd = () => {
    // 判断width值
    const rect = buttonRef.current?.getBoundingClientRect?.();
    if (rect) {
      const isLeft = rect?.left < screen.width / 2;
      // 下边界情况判定
      if (buttonRef.current && coordinate.current) {
        buttonRef.current.setAttribute(
          'style',
          `transition:all 300ms cubic-bezier(0.36, 1, 0.58, 1);transform: translate(${isLeft ? 0 - coordinate.current.left : 0}px,${
            (rect.top < 0 ? 0 : rect.top) - coordinate.current.top
          }px)`,
        );
      }
    }
    document.body.removeAttribute('style');
  };

  const handleTouchMove = (e: any) => {
    const coor = e.nativeEvent.changedTouches[0];
    if (buttonRef.current && coor && coordinate.current) {
      console.log(coor.pageX - coordinate.current.left);
      buttonRef.current.setAttribute(
        'style',
        `transform: translate(${coor.pageX - coordinate.current?.left - coordinate.current.width}px,${
          coor.pageY - coordinate.current?.top - coordinate.current.height
        }px)`,
      );
    }
    return false;
  };
  return (
    <>
      <Button ref={buttonRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <ComponentIcon color={color} fontSize={fontSize} />
      </Button>
    </>
  );
};

export default Auxiliary;
