import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

export default function Search({ nodes, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = (searchTerm && findNodeMatches(nodes, searchTerm)) || [];

  const handleSubmit = (search) => {
    if (!nodes[search]) {
      return;
    }

    setSearchTerm(search);
    setShowSuggestions(false);
    onSearch(search);
  };
  const handleChange = (event) => {
    setActiveSuggestion(0);
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (suggestionIdx) => {
    setActiveSuggestion(suggestionIdx);
    handleSubmit(filteredSuggestions[suggestionIdx]);
  };
  const handleKeyDown = (event) => {
    // User pressed the enter key
    if (event.keyCode === 13) {
      handleSubmit(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow, decrement the index
    if (event.keyCode === 38) {
      setActiveSuggestion(Math.max(activeSuggestion - 1, 0));
    }
    // User pressed the down arrow, increment the index
    if (event.keyCode === 40) {
      setActiveSuggestion(Math.min(activeSuggestion + 1, filteredSuggestions.length - 1));
    }
  };
  const handleBlur = () => {
    setShowSuggestions(false);
  };
  const handleFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <button onClick={() => handleSubmit(searchTerm)} type="button">
        Locate
      </button>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul>
          {filteredSuggestions.slice(0, 10).map((id, idx) => (
            <li
              key={id}
              className={(idx === activeSuggestion && styles.activeSuggestion) || null}
              onMouseDown={() => handleSuggestionClick(idx)}
            >
              {id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Search.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  onSearch: PropTypes.func.isRequired,
};

function findNodeMatches(nodes, searchTerm) {
  const cleanSearch = searchTerm.toLowerCase().trim();

  return Object.keys(nodes).filter((id) => id.includes(cleanSearch));
}
