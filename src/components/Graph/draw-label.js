export default function drawLabel(context, node) {
  const { x, y, id } = node;

  const label = id;

  context.fillText(label, x, y);
}
