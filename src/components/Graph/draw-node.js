/* eslint-disable no-param-reassign */
import { getConfig } from '../../services/read-config';

const statusCodes = {
  0: 'ok',
  1: 'warning',
  2: 'critical',
  3: 'emergency',
  4: 'unknown',
};

export default function drawNode(context, {
  x, y, type, status,
}) {
  const types = getConfig('entityTypes');
  const settings = getConfig('canvasSettings');
  const {
    defaultStatus, statusColors, statusStrokes, nodes,
  } = settings;
  const { lineWidth, radius } = nodes;
  const { shape, strokeColor } = types[type] || types.default;
  const statusCode = statusCodes[status] || defaultStatus;
  const fillStyle = statusColors[statusCode];
  const strokeStyle = statusStrokes[statusCode];

  context.fillStyle = fillStyle;
  context.strokeStyle = strokeColor || strokeStyle;
  context.lineWidth = lineWidth;

  renderShape(shape, context, { x, y, radius });
}

function renderShape(shape, context, props) {
  const shapes = {
    circle,
    database,
    hexagon,
    pentagon,
    rectangle,
    square,
    triangle,
  };
  const nodeShape = (shapes[shape] && shape) || 'circle';

  return shapes[nodeShape](context, props);
}

function square(context, { x, y }) {
  context.beginPath();
  context.rect(x - 1000 / 2, y - 1000 / 2, 1000, 1000);
  context.stroke();
  context.fill();
}
function rectangle(context, { x, y }) {
  context.beginPath();
  context.rect(x - 1400 / 2, y - 600 / 2, 1400, 600);
  context.stroke();
  context.fill();
}
function circle(context, { x, y, radius }) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
}
function database(context, { x, y, radius }) {
  const xRadius = radius / 1.2;
  const yRadius = radius / 2;
  context.lineWidth /= 2;

  context.beginPath();
  context.ellipse(x, y + 200, xRadius, yRadius, Math.PI, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.beginPath();
  context.ellipse(x, y + 0, xRadius, yRadius, Math.PI, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.beginPath();
  context.ellipse(x, y - 200, xRadius, yRadius, Math.PI, 0, Math.PI * 2);
  context.fill();
  context.stroke();
}

function pentagon(context, { x, y, radius }) {
  drawPolygon(context, {
    x,
    y,
    radius,
    sides: 5,
    size: radius * 1.1,
  });
}
function hexagon(context, { x, y, radius }) {
  drawPolygon(context, {
    x,
    y,
    radius,
    sides: 6,
    size: radius * 1.1,
  });
}
function triangle(context, { x, y, radius }) {
  drawPolygon(context, {
    x,
    y,
    radius,
    sides: 3,
    size: radius * 1.3,
  });
}

function drawPolygon(context, {
  x, y, sides, size,
}) {
  context.lineWidth /= 2;
  context.beginPath();
  context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

  for (let side = 0; side <= sides + 1; side += 1) {
    context.lineTo(
      x + size * Math.cos(side * 2 * (Math.PI / sides)),
      y + size * Math.sin(side * 2 * (Math.PI / sides)),
    );
  }

  context.fill();
  context.stroke();
}
