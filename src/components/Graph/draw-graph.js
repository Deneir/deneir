/* eslint-disable no-param-reassign */
import drawLink from './draw-link';
import { getConfig } from '../../services/read-config';
import drawNode from './draw-node';
import drawLabel from './draw-label';

export default function drawGraph(canvas, cameraPosition, { nodes, links }) {
  if (!cameraPosition) {
    return;
  }
  const context = canvas.getContext('2d');
  const settings = getConfig('canvasSettings');
  const { width, height } = canvas.parentElement.getBoundingClientRect();

  canvas.width = width;
  canvas.height = height;

  context.save();
  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, width, height);
  context.translate(cameraPosition.x, cameraPosition.y);
  context.scale(cameraPosition.k, cameraPosition.k);

  links.forEach((link) => drawLink(context, link));
  nodes.forEach((node) => drawNode(context, node));

  const { label } = settings.nodes;

  context.fillStyle = label.fillStyle;
  context.textAlign = label.textAlign;
  context.font = `${label.fontType} ${label.fontSize}px ${label.fontName}`;
  nodes.forEach((node) => drawLabel(context, node));

  context.restore();
}
