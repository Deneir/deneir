import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { statusCodesToLabels } from '../constants/status-codes';
import styles from './NodeDetails.module.scss';

export default function NodeList(props) {
  const {
    title, nodes, selectNode, defaultOpen = true,
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  const toggleIcon = (open && faArrowDown) || faArrowRight;

  return (
    <Fragment>
      <h2 onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {title}
      </h2>
      <ul className={(!open && styles.closed) || ''}>
        {nodes.length > 0
          && nodes.map((item) => (
            <li key={item.id}>
              <button className={styles.nodeLink} onClick={() => selectNode(item.id)}>
                {item.id} ({statusCodesToLabels[item.status]})
              </button>
            </li>
          ))}
        {nodes.length === 0 && (
          <p className={styles.emptyListMessage}>there are 0 nodes in this list</p>
        )}
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
