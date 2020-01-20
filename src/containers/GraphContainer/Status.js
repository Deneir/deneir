import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '../../services/read-config';

export default function Status({ className }) {
  const types = getConfig('entityTypes');

  return (
    <div className={`${className}`}>
      <ul>
        {Object.values(types).map((type) => (
          <li key={type.name}>
            <span style={{ backgroundColor: type.color }} />
            <em>{type.name}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

Status.propTypes = {
  className: PropTypes.string.isRequired,
};
