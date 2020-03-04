import { event } from 'd3';

// After a new pointer becomes active
export function onDragStart(simulation, transform) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = transform.invertX(event.x);
  event.subject.fy = transform.invertY(event.y);
}

// After an active pointer moves
export function onDrag(transform) {
  event.subject.fx = transform.invertX(event.x);
  event.subject.fy = transform.invertY(event.y);
}

// After an active pointer becomes inactive
export function onDragEnd(simulation) {
  if (!event.active) {
    simulation.alphaTarget(0);
  }
  event.subject.fx = null;
  event.subject.fy = null;
}
