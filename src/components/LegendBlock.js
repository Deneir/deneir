import React, { useState } from 'react';
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
