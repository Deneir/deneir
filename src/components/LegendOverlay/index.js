import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import NeighbourLevelControl from './NeighbourLevelControl';
import Legend from './Legend';

import styles from './index.module.scss';

export default function LegendOverlay(props) {
  const { actions, neighbourLevel } = props;
  const [isOpen, setOpen] = useState(true);
  const toggleIcon = (isOpen && faCaretDown) || faCaretUp;

  return (
    <div className={`${styles.wrapper} ${!isOpen && styles.closed}`}>
      <div className={styles.pullTab}>
        <button className={styles.title} onClick={() => setOpen(!isOpen)}>
          <span>Legend</span>
          <FontAwesomeIcon icon={toggleIcon} />
        </button>
      </div>
      <div className={styles.content}>
        <NeighbourLevelControl
          className={styles.neighbourLevelControl}
          setNeighbourLevel={actions.setNeighbourLevel}
          neighbourLevel={neighbourLevel}
        />
        <Legend />
      </div>
    </div>
  );
}

LegendOverlay.propTypes = {
  actions: PropTypes.object,
  groupedNodes: PropTypes.object,
  groupLevel: PropTypes.string,
  neighbourLevel: PropTypes.number,
  availableFilters: PropTypes.object,
  filters: PropTypes.object,
};
