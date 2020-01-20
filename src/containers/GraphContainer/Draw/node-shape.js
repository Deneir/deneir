// TODO: fix the positions
export default function shapeConfig(shape, context, { x, y, radius }) {
  switch (shape) {
    case 'circle':
      context.arc(x, y, radius, 0, 2 * Math.PI);
      break;
    case 'square':
      context.rect(x - (500 / 2), y - (1000 / 2), 500, 1000);
      break;
    case 'rectangle':
      context.rect(x - (1000 / 2), y - (800 / 2), 1000, 800);
      break;
    case 'diamond':
      // context.translate(x, y);
      // context.rotate(Math.PI / 4);
      // context.translate(-(850 / 2), -(850 / 2));
      // context.fillRect(0, 0, 850, 850);
      break;
    case 'triangle':
      context.moveTo(x + radius, y);
      // context.moveTo(600, 0);
      // context.lineTo(500, 200);
      // context.lineTo(700, 200);
      context.lineTo(x, y);
      context.lineTo(x, y);
      break;
    case 'ovale':
      context.scale(2, 1);
      context.arc(x, y, radius, 0, 2 * Math.PI);
      break;

    default:
      context.arc(x, y, radius, 0, 2 * Math.PI);
      break;
  }
}
