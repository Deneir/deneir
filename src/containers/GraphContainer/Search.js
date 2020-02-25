/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setProgrammaticZoom } from './canvas/handle-canvas-click';
import { getConfig } from '../../services/read-config';

export default function Search({ nodes, className, canvas }) {
  const { maxResults } = getConfig('search');

  const [searchTerm, setSearchTerm] = useState('');

  const results = !searchTerm
    ? []
    : nodes.filter((term) => term && term.id.includes(searchTerm.toLowerCase().trim()));

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { current: canvasElt } = canvas;
    const { width, height } = canvasElt;

    setProgrammaticZoom(canvasElt, results[0], { width, height });
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
        <button type="submit">Locate</button>
      </form>
      {results.length > 0 && results.length < maxResults && (
        <ul>
          {results.map((list) => (
            <li key={list.id} onClick={() => setSearchTerm(list.id)}>
              {list.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Search.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string.isRequired,
  canvas: PropTypes.instanceOf(Object),
};

Search.defaultProps = {
  canvas: {},
};
