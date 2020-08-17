import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './NeighbourLevelControl.module.scss';

export default function NeighbourLevelControl(props) {
  const debounceTimer = useRef();
  const { neighbourLevel, setNeighbourLevel } = props;

  function handleLevelChange(value) {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setNeighbourLevel(value);
    }, 0);
  }

  const ordinalMarkers = ['th', 'st', 'nd', 'rd'];
  const ordinalMarker = ordinalMarkers[neighbourLevel] || 'th';

  return (
    <div className={styles.neighbourLevelControl}>
      Show filtered nodes and their{' '}
      <input
        className={styles.numberInput}
        onChange={(e) => handleLevelChange(e.target.value)}
        value={neighbourLevel}
        type="number"
        min="0"
        max="10"
      />
      {ordinalMarker} level neighbours
    </div>
  );
}

NeighbourLevelControl.propTypes = {
  neighbourLevel: PropTypes.number.isRequired,
  setNeighbourLevel: PropTypes.func.isRequired,
};
