import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { statusCodesToLabels } from '../constants/status-codes';
import styles from './NodeList.module.scss';

export default function NodeList(props) {
  const {
    title, nodes, selectNode, defaultOpen = true,
  } = props;
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Fragment>
      <h2 onClick={() => setOpen(!open)}>{title}</h2>
      <ul className={(!open && styles.closed) || ''}>
        {nodes.map((item) => (
          <li key={item.id}>
            <button className={styles.nodeLink} onClick={() => selectNode(item.id)}>
              {item.id} ({statusCodesToLabels[item.status]})
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

NodeList.propTypes = {
  nodes: PropTypes.array.isRequired,
  selectNode: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};
