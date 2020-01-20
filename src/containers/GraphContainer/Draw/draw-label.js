import { getConfig } from '../../../services/read-config';

// Show labels
export default function drawLabel(context, {
  x, y, id, fontSize,
}) {
  const { nodes } = getConfig('canvasSettings');
  const { label } = nodes;
  const textWidth = context.measureText(id).width;
  const newContext = context;

  context.beginPath();
  newContext.fillStyle = label.backgroundColor;
  newContext.shadowColor = label.shadowColor;
  newContext.shadowBlur = label.shadowBlur;
  context.fillRect(x - textWidth / 2 - 3, y - 22, textWidth + 6, 15);
  newContext.fillStyle = label.fillStyle;
  newContext.textAlign = label.textAlign;
  newContext.font = `${label.fontType} ${fontSize}px ${label.fontName}`;
  context.fillText(id.toUpperCase(), x, y);
}
