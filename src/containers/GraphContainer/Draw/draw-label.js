/* eslint-disable no-param-reassign */
import { getConfig } from '../../../services/read-config';

export default function drawLabel(context, node) {
  const { x, y, id } = node;
  const settings = getConfig('canvasSettings');
  const { label } = settings.nodes;
  const textWidth = context.measureText(id).width;

  context.beginPath();
  context.fillStyle = label.backgroundColor;
  context.shadowColor = label.shadowColor;
  context.shadowBlur = label.shadowBlur;
  context.fillRect(x - textWidth / 2 - 3, y - 22, textWidth + 6, 15);
  context.fillStyle = label.fillStyle;
  context.textAlign = label.textAlign;
  context.font = `${label.fontType} ${label.fontSize}px ${label.fontName}`;
  context.fillText(id.toUpperCase(), x, y);
}
