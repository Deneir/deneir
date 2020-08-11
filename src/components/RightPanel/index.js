import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.scss';

export default function RightPanel(props) {
  const { children, handleOpenPanel, isPanelOpen } = props;
  const rightPanelIcon = (isPanelOpen && faTimes) || faBars;
  const RightPanelToggleButton = () => (
    <button className={styles.closeButton} onClick={() => handleOpenPanel(!isPanelOpen)}>
      <FontAwesomeIcon icon={rightPanelIcon} />
    </button>
  );
  const closedPanelClass = (!isPanelOpen && styles.closed) || '';

  return (
    <section className={`${styles.panel} ${closedPanelClass}`}>
      <div className={styles.togglePanelContainer}>
        <RightPanelToggleButton />
      </div>
      {children}
    </section>
  );
}

RightPanel.propTypes = {
  children: PropTypes.any,
  handleOpenPanel: PropTypes.func,
  isPanelOpen: PropTypes.bool,
};
