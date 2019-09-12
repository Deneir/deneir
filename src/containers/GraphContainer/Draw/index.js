import drawNodeArrow from './node-arrow';
import nodeConfig from './node-config';
import { getConfig } from '../../../services/read-config';

// Show links
function drawLink(context, { source, target }) {
  const { config } = getConfig('node');
  drawNodeArrow(context, { source, target }, config);
}

// Show Nodes
function drawNode(context, {
  x, y, radius, type, status: statusCode,
}, settings) {
  const newContext = context;
  const types = getConfig('types');
  const { status } = getConfig('node');
  const { color } = nodeConfig(types, type);

  // node
  context.beginPath();
  newContext.lineWidth = settings.lineWidth;
  newContext.fillStyle = color;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
  newContext.strokeStyle = settings.backgroundColor;

  // outer circle
  context.beginPath();
  context.arc(x, y, radius - (radius / 6), 0, 2 * Math.PI);
  newContext.lineWidth = settings.lineWidth;
  context.fill();
  context.stroke();

  const strokeStyles = {
    0: status.ok,
    1: status.warning,
    2: status.ko,
  };

  newContext.strokeStyle = strokeStyles[statusCode] || strokeStyles[0];
}

// Show labels
function drawLabel(context, {
  x, y, id, fontSize,
}) {
  const { label } = getConfig('node');

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

// Draw /redraw  all elements
export default function drawAll(
  context,
  transform,
  { nodes, links },
  canvas,
) {
  const settings = getConfig('settings');

  const newContext = context;
  context.save();
  newContext.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(transform.x, transform.y);
  context.scale(transform.k, transform.k);

  links.forEach((link) => drawLink(context, link));
  nodes.forEach((node) => drawNode(context, node, settings));
  nodes.forEach((node) => drawLabel(context, node));
  context.restore();
}
