import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LegendBlock.module.scss';

export default function LegendBlock(props) {
  const { initialOpen = true, title, children } = props;
  const [isOpen, setOpen] = useState(initialOpen);

  return (
    <div className={styles.LegendBlock}>
      {title && (
        <div className={styles.title} onClick={() => setOpen(!isOpen)}>
          {title}
        </div>
      )}
      <div className={`${styles.contentPanel} ${isOpen && styles.open}`}>
      {children}
      </div>
    </div>
  );
}

LegendBlock.propTypes = {
  initialOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};
