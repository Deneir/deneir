import * as d3 from 'd3';
import { getConfig } from '../../services/read-config';

/**
 * Find a node from a click
 * only nodes that we have send an event
 * d3.event.x is the same as d3.mouse
 * consistent-return is disabled because it breaks the behavior
 * if anything is returned beside undefined
 *
 * @param {Object} transform transform infos (k, x, y)
 * @param {Object} data the nodes
 * @param {Boolean} isClicked for the drag or the click
 * @return {Object} the clicked node
 */

export default function getNodeFromCanvasClick(transform, nodes) {
  const layerX = (d3.event.sourceEvent && d3.event.sourceEvent.layerX) || d3.event.layerX;
  const layerY = (d3.event.sourceEvent && d3.event.sourceEvent.layerY) || d3.event.layerY;
  const x = d3.event ? transform.invertX(layerX) : null;
  const y = d3.event ? transform.invertY(layerY) : null;
  const { nodes: nodesConfig } = getConfig('canvasSettings');
  const { radius } = nodesConfig;

  let dx;
  let dy;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    dx = x - node.x;
    dy = y - node.y;

    if (dx * dx + dy * dy < radius * radius) {
      return node;
    }
  }

  return undefined;
}
