/* eslint-disable no-param-reassign */
import { getConfig } from '../../../services/read-config';

export default function drawNode(context, {
  x, y, type, status: statusCode,
}) {
  const types = getConfig('entityTypes');
  const settings = getConfig('canvasSettings');
  const { statusColors, nodes } = settings;
  const { lineWidth, radius } = nodes;
  const { shape, color } = types[type] || types.default;
  const strokeStyles = {
    0: statusColors.ok,
    1: statusColors.warning,
    2: statusColors.ko,
  };

  context.fillStyle = strokeStyles[statusCode] || strokeStyles[0];
  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  renderShape(shape, context, { x, y, radius });
}

function renderShape(shape, context, props) {
  const shapes = {
    square,
    circle,
    database,
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

//     'diamond':
//       // context.translate(x, y);
//       // context.rotate(Math.PI / 4);
//       // context.translate(-(850 / 2), -(850 / 2));
//       // context.fillRect(0, 0, 850, 850);

//     'triangle':
//       context.moveTo(x + radius, y);
//       // context.moveTo(600, 0);
//       // context.lineTo(500, 200);
//       // context.lineTo(700, 200);
//       context.lineTo(x, y);
//       context.lineTo(x, y);

//     'oval':
//       context.scale(2, 1);
//       context.arc(x, y, radius, 0, 2 * Math.PI);
