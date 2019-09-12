/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setProgrammaticZoom } from './Select';
import { getConfig } from '../../services/read-config';

export default function Search({ nodes, className }) {
  const { maxResults } = getConfig('search');

  const [searchTerm, setSearchTerm] = useState('');
  const { canvas, setZoom, size } = useSelector((state) => state.canvas);

  const results = !searchTerm ? [] : nodes.filter((term) => (
    term && term.id.includes(searchTerm.toLowerCase().trim())
  ));

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setProgrammaticZoom(canvas, setZoom, results[0], size);
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Locate</button>
      </form>
      {results.length > 0 && results.length < maxResults && (
        <ul>
          {results.map((list) => (
            <li key={list.id} onClick={() => setSearchTerm(list.id)}>{list.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

Search.propTypes = {
  nodes: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
};
