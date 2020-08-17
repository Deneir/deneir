import React from 'react';
import { getConfig } from '../../services/read-config';
import styles from './StatusLegend.module.scss';

export default function StatusLegend() {
  // const entityTypes = getConfig('entityTypes');
  const { statusColors, statusStrokes } = getConfig('canvasSettings');

  return (
    <div title="status">
    <ul className={styles.status}>
      {Object.keys(statusColors).map((status) => (
        <li key={status}>
          <span
            style={{
              backgroundColor: statusColors[status],
              borderColor: statusStrokes[status],
            }}
          />
          <em>{status}</em>
        </li>
      ))}
    </ul>
    </div>
  );
}
