function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function defineDrawTextMethod(): 'fillText' | 'strokeText' {
  return Math.random() >= 0.5 ? 'fillText' : 'strokeText';
}

function defineRotateAngle(minAngle: number = 0, maxAngle: number = 360): number {
  const angle = random(minAngle, maxAngle);
  return (Math.PI * angle) / 180;
}

function defineColor(): string {
  const [r, g, b] = Array.from({ length: 3 }).map(() => {
    return parseInt(String(random(0, 255)))
      .toString(16)
      .padStart(2, '0');
  });
  return `#${r}${g}${b}`;
}

interface CanvasAttributes {
  width?: number;
  height?: number;
  fill?: string;
  fontSize?: number;
  minAngle?: number;
  maxAngle?: number;
}
function drawVerification(
  ctx: CanvasRenderingContext2D,
  test: string,
  { height = 150, width = 300, fontSize = 24, minAngle = 0, maxAngle = 90 }: CanvasAttributes,
) {
  // 绘制区域的宽度
  const containerWidth = width / test.length;
  ctx.font = `${fontSize}px bold`;
  ctx.save();
  const backgroundColor = defineColor();
  ctx.fillStyle = backgroundColor;
  ctx.globalAlpha = random(0, 0.6);
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  // 随机线条分布
  const lineNumber = random(0, 10);
  for (let i = 0; i < lineNumber; i++) {
    ctx.save();
    ctx.strokeStyle = defineColor();
    ctx.globalAlpha = random(0, 0.8);
    ctx.beginPath();
    ctx.translate(random(0, width / 2), random(0, height / 2));
    ctx.rotate(defineRotateAngle(minAngle, maxAngle));
    ctx.moveTo(0, 0);
    ctx.lineTo(random(0, width), random(0, height));
    ctx.stroke();
    ctx.closePath();
    ctx.rotate(defineRotateAngle(minAngle, maxAngle));
    ctx.restore();
  }

  for (let i = 0; i < test.length; i++) {
    ctx.save();
    const angle = defineRotateAngle(minAngle, maxAngle);
    let drawHeight = random(0, height);
    drawHeight = Math.min(height - fontSize, drawHeight);
    drawHeight = Math.max(drawHeight, fontSize);
    let fillColor = defineColor();
    while (fillColor === backgroundColor) {
      fillColor = defineColor();
    }
    ctx.fillStyle = defineColor();
    let drawWidth = Math.max(containerWidth * i, 0) + random(0, containerWidth - fontSize);
    ctx.translate(drawWidth, drawHeight);
    ctx.rotate(angle);
    const drawTextMethod = defineDrawTextMethod();
    ctx[drawTextMethod](test[i], 0, 0);
    ctx.restore();
  }
}

export { drawVerification };
