import styles from './index.less';
import { useEffect } from 'react';

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null = null;
let isMouseUp: boolean = false;
// 判断是否移出了canvas之外了
function bodyMouseMoving(e: MouseEvent): void {
  if (isMouseUp) {
    isMouseUp = false;
    ctx?.save();
    if (canvas) canvas.removeEventListener('mousemove', mouseMoving, false);
  }
}
// 获取canvas元素的值
function getCanvasElement() {
  canvas = document.querySelector('canvas');
  if (canvas) {
    const width: number = 900 || document.body.offsetWidth;
    const height: number = 450 || document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
  }
}
//TODO: canvas 实现画板功能
function drawCanvas(x?: number, y?: number): void {
  if (ctx) {
    ctx.restore();
    if (x && y) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}
// 鼠标移动事件
function mouseMoving(e: MouseEvent) {
  e.stopPropagation();
  const x: number = e.offsetX;
  const y: number = e.offsetY;
  drawCanvas(x, y);
}
// 鼠标按下事件
function handleClick(event: React.MouseEvent) {
  const canvas = document.querySelector('canvas');
  const { offsetX, offsetY } = event.nativeEvent;
  isMouseUp = true;
  ctx?.restore();
  ctx?.beginPath();
  ctx?.moveTo(offsetX, offsetY);
  if (canvas) canvas.addEventListener('mousemove', mouseMoving, false);
}
// 鼠标松开事件
function handleMouseUp(event: React.MouseEvent) {
  const canvas = document.querySelector('canvas');
  isMouseUp = false;
  ctx?.save();
  if (canvas) canvas.removeEventListener('mousemove', mouseMoving, false);
}
export default function CanvasDemo() {
  useEffect(() => {
    getCanvasElement();
    document.body.addEventListener('mousemove', bodyMouseMoving, false);
    return () => {
      document.body.removeEventListener('mousemove', bodyMouseMoving, false);
    };
  }, []);
  return (
    <div className={styles['online-draw']}>
      <canvas
        id="canvas"
        onMouseDown={handleClick}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
}
