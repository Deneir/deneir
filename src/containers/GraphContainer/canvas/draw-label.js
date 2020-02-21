/* eslint-disable no-param-reassign */
export default function drawLabel(context, node) {
  const { x, y, id } = node;

  const label = id.toUpperCase();

  context.fillText(label, x, y);
}
