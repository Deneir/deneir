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
  const { width } = canvas.getBoundingClientRect();
  const height = window.innerHeight;

  // Ensure it isn't blurry for retina display
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const settings = getConfig('canvasSettings');

  context.save();
  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
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
