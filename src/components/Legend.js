import React from 'react';
import { getConfig } from '../services/read-config';
import styles from './Legend.module.scss';

export default function Legend() {
  // const entityTypes = getConfig('entityTypes');
  const { statusColors, statusStrokes } = getConfig('canvasSettings');

  return (
    <div>
      <div className={styles.status}>
        <ul>
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
    </div>
  );
}
