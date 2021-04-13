import React from 'react';
import EntityShape from '../EntityShape/index';
import { getConfig } from '../../services/read-config';
import styles from './Legend.module.scss';

export default function StatusLegend() {
  const entityTypes = getConfig('entityTypes');
  const { statusColors } = getConfig('canvasSettings');

  return (
    <div className={styles.legendWrapper} title="status">
      <div>
        <h3>Status</h3>
        <ul className={styles.legend}>
          {Object.keys(statusColors).map((status) => (
            <li key={status}>
              <span
                className={styles.statusColorMarker}
                style={{
                  backgroundColor: statusColors[status],
                }}
              />
              <span className={styles.label}>{status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Type</h3>
        <ul className={styles.legend}>
          {Object.keys(entityTypes).map((type) => {
            const { name, shape } = entityTypes[type];

            return (
              <li key={type}>
                <EntityShape name={name} shape={shape} />
                <span className={styles.label}>{type} </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
