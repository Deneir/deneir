import drawLink from './draw-link';
import { getConfig } from '../../../services/read-config';
import drawNode from './draw-node';
import drawLabel from './draw-label';

// Draw /redraw  all elements
export default function drawAll(context, transform, { nodes, links }, canvas) {
  const settings = getConfig('canvasSettings');

  const newContext = context;
  context.save();
  newContext.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  links.forEach((link) => drawLink(context, link));
  nodes.forEach((node) => drawNode(context, node));
  nodes.forEach((node) => drawLabel(context, node));
  context.restore();
}
