import { useRef, useEffect } from 'react';
import { drawVerification } from './draw';

interface Props {
  text: string;
  height?: number;
  width?: number;
}

const Verification: React.FC<Props> = ({ text, height = 150, width = 300 }) => {
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
      ctx && text && drawVerification(ctx, text, canvasAttributes);
    }
  }, [text, height, width]);
  return (
    <>
      <canvas ref={canvasRef} height={height} width={width} />
    </>
  );
};

export default Verification;
