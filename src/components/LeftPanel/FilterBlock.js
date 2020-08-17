import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from './FilterBlock.module.scss';

export default function FilterBlock(props) {
  const { initialOpen = true, title, children } = props;
  const [isOpen, setOpen] = useState(initialOpen);
  const toggleIcon = (isOpen && faCaretDown) || faCaretRight;

  return (
    <div className={styles.LegendBlock}>
      {title && (
        <button className={styles.title} onClick={() => setOpen(!isOpen)}>
          <span>{title}</span>
          <FontAwesomeIcon icon={toggleIcon} />
        </button>
      )}
      <div className={`${styles.contentPanel} ${isOpen && styles.open}`}>{children}</div>
    </div>
  );
}

FilterBlock.propTypes = {
  initialOpen: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
};
