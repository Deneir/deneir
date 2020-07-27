import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './LegendBlock.module.scss';

export default function LegendBlock(props) {
  const { initialOpen = true, title, children } = props;
  const [isOpen, setOpen] = useState(initialOpen);
  const toggleIcon = (isOpen && faArrowDown) || faArrowRight;

  return (
    <div className={styles.LegendBlock}>
      {title && (
        <div className={styles.title} onClick={() => setOpen(!isOpen)}>
          <FontAwesomeIcon icon={toggleIcon} /> {title}
        </div>
      )}
      <div className={`${styles.contentPanel} ${isOpen && styles.open}`}>{children}</div>
    </div>
  );
}

LegendBlock.propTypes = {
  initialOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
};
