import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import StatusBubble from './StatusBubble';
import styles from './NodeList.module.scss';

export default function NodeList(props) {
  const {
    title, nodes, defaultOpen = true,
  } = props;
  const [open, setOpen] = useState(defaultOpen);
  const toggleIcon = (open && faCaretDown) || faCaretRight;

  return (
    <Fragment>
      <h3 className={styles.listTitle} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={toggleIcon} /> {title}
      </h3>
      <ul className={(!open && styles.closed) || ''}>
        {nodes.length > 0
          && nodes.map((item) => (
            <li key={item.id}>
              <Link className={styles.nodeLink} to={`/node/${item.id}`}>
                <StatusBubble statusCode={item.status} /> {item.id}
              </Link>
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
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};
