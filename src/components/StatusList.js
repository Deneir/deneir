import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '../services/read-config';
import { statusCodesToLabels } from '../constants/status-codes';
import styles from './StatusList.module.scss';

export default function StatusList(props) {
  const {
    title, items, defaultOpen = true,
  } = props;
  const settings = getConfig('canvasSettings');
  const { statusColors } = settings;
  const [open, setOpen] = useState(defaultOpen);
  const toggleIcon = (open && faCaretDown) || faCaretRight;
  const aggregatedStatusCode = Math.max(...items.map((n) => n.status));
  const statusLabel = statusCodesToLabels[aggregatedStatusCode];
  const statusColor = statusColors[statusLabel];

  return (
    <div className={styles.nodeList}>
      <button
        className={styles.title}
        style={{ borderColor: statusColor }}
        onClick={() => setOpen(!open)}
      >
        {title} ({items.length}) <FontAwesomeIcon icon={toggleIcon} />
      </button>
      <div>
        <ul className={(!open && styles.closed) || ''}>
          {items.length > 0
            && items.map((item) => {
              const itemStatusLabel = statusCodesToLabels[item.status];
              const itemStatusColor = statusColors[itemStatusLabel];

              return (
                <li key={item.id} style={{ borderColor: itemStatusColor }}>
                  {item.content}
                </li>
              );
            })}
          {items.length === 0 && (
            <li className={styles.emptyListMessage}>there are no items in this list</li>
          )}
        </ul>
      </div>
    </div>
  );
}

StatusList.propTypes = {
  items: PropTypes.array.isRequired,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};
