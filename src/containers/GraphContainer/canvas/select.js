import * as d3 from 'd3';
import { getConfig } from '../../../services/read-config';

/**
 * Find the position of the selected node
 * only nodes that we got are sending an event
 * d3.event.x is the same as d3.mouse
 * consistent-return is disabled because it's breaks the behavior
 * if anything is returned beside undefined
 *
 * @param {Object} transform transform infos (k, x, y)
 * @param {Object} data the nodes
 * @param {Boolean} isClicked for the drag or the click
 * @return {Object} the selected node
 */

// eslint-disable-next-line consistent-return
export default function select(transform, nodes, isClicked = false) {
  const x = d3.event ? transform.invertX(d3.event.x) : null;
  const y = d3.event ? transform.invertY(d3.event.y) : null;

  let dx;
  let dy;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const { radius } = node;
    dx = x - node.x;
    dy = y - node.y;

    if (dx * dx + dy * dy < radius * radius) {
      if (isClicked) {
        return node;
      }
      node.x = transform.applyX(node.x);
      node.y = transform.applyY(node.y);
      return node;
    }
  }
}

/**
 * Create a programmatic zoom
 *
 * @param {Object} canvas canvas object
 * @param {Function} setZoom the zoom fn created initially
 * @param {Object} filtered the coordinates of the filtered node
 * @param {Object} size width and height of the canvas (without retina)
 */

export function setProgrammaticZoom(canvas, filtered, size) {
  if (filtered && filtered.x && filtered.y) {
    const settings = getConfig('canvasSettings');
    const { scale, duration } = settings;

    d3.select(canvas).transition().duration(duration).call(
      canvas.setZoom.transform,
      d3.zoomIdentity
        .translate(size.width / 2, size.height / 2)
        .scale(scale)
        .translate(-filtered.x, -filtered.y),
    );
  }
}
