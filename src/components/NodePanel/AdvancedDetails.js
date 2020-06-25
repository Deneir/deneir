import React from 'react';
import PropTypes from 'prop-types';
import RawDetails from './RawDetails';
import styles from './AdvancedDetails.module.scss';
import { statusCodesToLabels } from '../../constants/status-codes';
import { getConfig } from '../../services/read-config';

export default function AdvancedDetails(props) {
  const { details } = props;

  if (Array.isArray(details)) {
    if (details.length === 0) {
      return <div>no items</div>;
    }
    return (
      <div>
        {details.map((item) => {
          const statusCode = item.dependencies
            && Math.max(...item.dependencies.map((d) => d.status.code));

          return (
            <div key={item.id} className={styles.arrayItemBlock}>
              <h3>
                {statusCode !== false && <StatusBubble statusCode={statusCode} />}
                {' '}{item.title}</h3>
              <p>
                {item.id} {(item.url && <a href={item.url}>(url)</a>)}
              </p>
              {item.details &&
              <RawDetails details={item.details} />}
            </div>
          );
        })}
      </div>
    );
  }
}

AdvancedDetails.propTypes = {
  details: PropTypes.instanceOf(Object),
};

function StatusBubble(props) {
  const { statusCode } = props;
  const settings = getConfig('canvasSettings');
  const { statusColors, statusStrokes } = settings;
  const statusLabel = statusCodesToLabels[statusCode];
  const statusColor = statusColors[statusLabel];
  const statusStroke = statusStrokes[statusLabel];

  return (
    <svg height="20px" width="20px">
      <circle fill={statusColor} stroke={statusStroke} strokeWidth="2" cx="10" cy="10" r="8" />
    </svg>
  );
}

StatusBubble.propTypes = {
  statusCode: PropTypes.number,
};
