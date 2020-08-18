import React from 'react';
import PropTypes from 'prop-types';
import circle from './circle.svg';
import database from './database.svg';
import hexagon from './hexagon.svg';
import pentagon from './pentagon.svg';
import heptagon from './heptagon.svg';
import octogon from './octogon.svg';
import rectangle from './rectangle.svg';
import square from './square.svg';
import triangle from './triangle.svg';

const shapes = {
  circle,
  database,
  hexagon,
  pentagon,
  heptagon,
  octogon,
  rectangle,
  square,
  triangle,
};

export default function EntityShape(props) {
  const { name, shape } = props;
  const icon = shapes[shape];

  return <img src={icon} alt={`type ${name} is shown as ${shape}s on the graph`} />;
}

EntityShape.propTypes = {
  name: PropTypes.string,
  shape: PropTypes.string,
};
