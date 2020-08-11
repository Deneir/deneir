import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '../services/read-config';
import { statusCodesToLabels } from '../constants/status-codes';
import styles from './NodeList.module.scss';

export default function NodeList(props) {
  const { title, nodes, defaultOpen = true } = props;
  const settings = getConfig('canvasSettings');
  const { statusColors } = settings;
  const [open, setOpen] = useState(defaultOpen);
  const toggleIcon = (open && faCaretDown) || faCaretRight;
  const aggregatedStatusCode = Math.max(...nodes.map((n) => n.status));
  const statusLabel = statusCodesToLabels[aggregatedStatusCode];
  const statusColor = statusColors[statusLabel];

  return (
    <div className={styles.nodeList}>
      <h3 style={{ borderColor: statusColor }} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {title}
      </h3>
      <ul className={(!open && styles.closed) || ''}>
        {nodes.length > 0
          && nodes.map((item) => {
            const itemStatusLabel = statusCodesToLabels[item.status];
            const itemStatusColor = statusColors[itemStatusLabel];

            return (
              <li key={item.id} style={{ borderColor: itemStatusColor }}>
                <Link className={styles.nodeLink} to={`/node/${item.id}`}>
                  {item.id}
                </Link>
              </li>
            );
          })}
        {nodes.length === 0 && (
          <p className={styles.emptyListMessage}>there are 0 nodes in this list</p>
        )}
      </ul>
    </div>
  );
}

NodeList.propTypes = {
  nodes: PropTypes.array.isRequired,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};
