import { useRef, useEffect, memo } from 'react';
import { drawVerification } from './draw';
import { noop } from '../../lib/shard';
interface Props {
  text: string;
  height?: number;
  width?: number;
  handleCanvasChange: (...args: any[]) => any;
}

const Verification: React.FC<Props> = ({ text, height = 150, width = 300, handleCanvasChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.height = height;
      canvas.width = width;
      const canvasAttributes = {
        width,
        height,
      };
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, width, height);
      ctx && text && drawVerification(ctx, text, canvasAttributes);
    }
  }, [text, height, width]);
  return (
    <>
      <canvas ref={canvasRef} height={height} width={width} onClick={handleCanvasChange || noop} />
    </>
  );
};

export default memo(Verification);
