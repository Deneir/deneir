import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import NodeList from '../NodeList';
import styles from './index.module.scss';
import AdvancedDetails from './AdvancedDetails';

export default function NodeDetails(props) {
  const { selectedNode, details, actions } = props;
  const [open, setOpen] = useState(false);
  const toggleIcon = (open && faArrowDown) || faArrowRight;

  return (
    <Fragment>
      <div className={styles.header}>
        <h1>{selectedNode.id}</h1>
        <button type="button" onClick={() => actions.selectNode(null)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={styles.textBlock}>
        {Object.keys(selectedNode.tags).map((tagName) => {
          return (
            <p key={tagName}>
              <b>{tagName}:</b> {selectedNode.tags[tagName]}
            </p>
          );
        })}
      </div>
      {details && (
        <div className={styles.textBlock}>
          <h2 onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={toggleIcon} /> Details
          </h2>
          <div className={(!open && styles.closed) || ''}>
            <AdvancedDetails details={details} />
          </div>
        </div>
      )}
      <div>
        <NodeList
          title="Dependencies"
          selectNode={(id) => actions.selectNode(id)}
          nodes={selectedNode.dependencies}
        />
        <NodeList
          title="Dependents"
          selectNode={(id) => actions.selectNode(id)}
          nodes={selectedNode.dependents}
        />
      </div>
    </Fragment>
  );
}

NodeDetails.propTypes = {
  selectedNode: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  details: PropTypes.instanceOf(Object),
};
