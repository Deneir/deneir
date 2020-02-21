/* eslint-disable no-param-reassign */

import drawLink from './draw-link';
import { getConfig } from '../../../services/read-config';
import drawNode from './draw-node';
import drawLabel from './draw-label';

export default function drawGraph(context, transform, { nodes, links }, canvas) {
  const settings = getConfig('canvasSettings');

  context.save();
  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  links.forEach((link) => drawLink(context, link));
  nodes.forEach((node) => drawNode(context, node));

  const { label } = settings.nodes;

  context.fillStyle = label.fillStyle;
  context.textAlign = label.textAlign;
  context.font = `${label.fontType} ${label.fontSize}px ${label.fontName}`;
  nodes.forEach((node) => drawLabel(context, node));

  context.restore();
}
