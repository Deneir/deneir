import React from 'react';
import PropTypes from 'prop-types';
import { statusCodesToLabels } from '../constants/status-codes';
import { getConfig } from '../services/read-config';

export default function StatusBubble(props) {
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
