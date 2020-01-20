import { getConfig } from '../../../services/read-config';

/**
 * Create angles for the arrow
 *
 * @param {Object} links get the source and the target
 * @param {Number} radius radius of the node
 * @param {Number} arcX arcX
 * @param {Number} arcY arcY
 *
 */
function drawAngle(links, radius, arcX, arcY) {
  const { x: sourceX, y: sourceY } = links.source;
  const { x: targetX, y: targetY } = links.target;
  const config = getConfig('canvasSettings');
  const {
    bend, arrowLength, startArrow, endArrow, startRadius, endRadius,
  } = config.links;

  const circumference = Math.PI * 2;
  let drawStartArrow = startArrow;
  let drawEndArrow = endArrow;
  let secondAngle;
  let firstAngle;
  let finalFirstAngle;
  let finalSecondAngle;

  // find angle from center to start and end
  firstAngle = Math.atan2(sourceY - arcY, sourceX - arcX);
  secondAngle = Math.atan2(targetY - arcY, targetX - arcX);

  // normalise angles
  firstAngle = (firstAngle + circumference) % circumference;
  secondAngle = (secondAngle + circumference) % circumference;

  // ensure angles are in correct directions
  if (bend < 0) {
    if (firstAngle < secondAngle) {
      firstAngle += circumference;
    }
  } else if (secondAngle < firstAngle) {
    secondAngle += circumference;
  }

  // convert arrow length to angular length
  const arrowAng = (arrowLength / radius) * Math.sign(bend);

  // get angular length of start and end circles and move arc start and ends
  firstAngle += (startRadius / radius) * Math.sign(bend);
  secondAngle -= (endRadius / radius) * Math.sign(bend);
  finalFirstAngle = firstAngle;
  finalSecondAngle = secondAngle;

  // check for too close and no room for arc
  if ((bend < 0 && firstAngle < secondAngle) || (bend > 0 && secondAngle < firstAngle)) {
    return;
  }
  // is there a start arrow
  if (drawStartArrow) {
    finalFirstAngle += arrowAng;
  } // move arc start to inside arrow
  // is there an end arrow
  if (drawEndArrow) {
    finalSecondAngle -= arrowAng;
  } // move arc end to inside arrow

  // check for too close and remove arrows if so
  if (
    (bend < 0 && finalFirstAngle < finalSecondAngle)
    || (bend > 0 && finalSecondAngle < finalFirstAngle)
  ) {
    drawStartArrow = false;
    drawEndArrow = false;
    finalFirstAngle = firstAngle;
    finalSecondAngle = secondAngle;
  }

  // eslint-disable-next-line consistent-return
  return {
    firstAngle,
    secondAngle,
    finalFirstAngle,
    finalSecondAngle,
    radius,
    arcX,
    arcY,
  };
}

function drawArrow(context, angle, finalAngle, arrowWidth, angles) {
  const { radius, arcX, arcY } = angles;
  context.moveTo(Math.cos(angle) * radius + arcX, Math.sin(angle) * radius + arcY);
  context.lineTo(
    Math.cos(finalAngle) * (radius - arrowWidth / 2) + arcX,
    Math.sin(finalAngle) * (radius - arrowWidth / 2) + arcY,
  );
  context.lineTo(
    Math.cos(finalAngle) * (radius + arrowWidth / 2) + arcX,
    Math.sin(finalAngle) * (radius + arrowWidth / 2) + arcY,
  );
  context.closePath();
}

function drawArc(context, angles) {
  const newContext = context;

  const config = getConfig('canvasSettings');
  const {
    bend, startArrow, endArrow, vectorColor, arrowWidth,
  } = config.links;
  const {
    firstAngle, secondAngle, finalFirstAngle, finalSecondAngle, radius, arcX, arcY,
  } = angles;

  context.beginPath();
  context.arc(arcX, arcY, radius, finalFirstAngle, finalSecondAngle, bend < 0);
  newContext.fillStyle = vectorColor;
  newContext.lineWidth = 20;
  context.stroke();
  newContext.strokeStyle = vectorColor;

  // draw start arrow if needed
  context.beginPath();
  if (startArrow) {
    drawArrow(context, firstAngle, finalFirstAngle, arrowWidth, angles);
  }

  // draw end arrow if needed
  if (endArrow) {
    drawArrow(context, secondAngle, finalSecondAngle, arrowWidth, angles);
  }
  context.fill();
}

/**
 * Create vectors for canvas graph
 *
 * @param {Object} context context of the canvas
 * @param {Object} links get the source and the target
 *
 */
export default function drawNodeArrow(context, links) {
  const config = getConfig('canvasSettings');
  const { x: sourceX, y: sourceY } = links.source;
  const { x: targetX, y: targetY } = links.target;

  let vectorX;
  let vectorY;
  let radius;

  // find mid point
  const horizontalMidPoint = (sourceX + targetX) / 2;
  const verticalMidPoint = (sourceY + targetY) / 2;

  // get vector from start to end
  vectorX = targetX - sourceX;
  vectorY = targetY - sourceY;

  // find distance
  const distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

  // normalise vector
  vectorX /= distance;
  vectorY /= distance;

  const bendDistance = config.links.bend * distance;

  // Arc amount bend more at distance
  const arcAmountX = horizontalMidPoint + vectorY * bendDistance;
  const arcAmountY = verticalMidPoint - vectorX * bendDistance;

  // get the radius
  radius = (0.5
      * ((sourceX - arcAmountX) * (sourceX - arcAmountX)
        + (sourceY - arcAmountY) * (sourceY - arcAmountY)))
    / bendDistance;

  // use radius to get arc center
  const arcX = arcAmountX - vectorY * radius;
  const arcY = arcAmountY + vectorX * radius;

  // radius needs to be positive for the rest of the code
  radius = Math.abs(radius);

  const angles = drawAngle(links, radius, arcX, arcY) || {};

  drawArc(context, angles);
}
