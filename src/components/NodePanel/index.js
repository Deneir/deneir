import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NodeList from '../NodeList';
import styles from './index.module.scss';
import AdvancedDetails from './AdvancedDetails';
import { getConfig } from '../../services/read-config';
import { readNodeDetails } from '../../actions/nodes';

export default function NodeDetails(props) {
  const dispatch = useDispatch();
  const { nodes, details } = props;
  const { selectedNodeId } = useParams();
  const selectedNode = nodes[selectedNodeId];

  useEffect(() => {
    const detailsUrl = getConfig('detailsUrl');

    if (detailsUrl) {
      dispatch(readNodeDetails(selectedNodeId));
    }
  }, [dispatch, selectedNodeId]);

  if (!selectedNode) {
    return <div>oulala</div>;
  }

  return (
    <Fragment>
      <div className={styles.header}>
        <h1>{selectedNode.id}</h1>
        <Link type="button" to="/">
          <FontAwesomeIcon icon={faTimes} />
        </Link>
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
          <h2>Instances</h2>
          <AdvancedDetails details={details} />
        </div>
      )}
      <div>
        <NodeList
          title="Dependencies"
          nodes={selectedNode.dependencies.map((n) => ({ ...n, status: nodes[n.id].status }))}
        />
        <NodeList
          title="Dependents"
          nodes={selectedNode.dependents.map((n) => ({ ...n, status: nodes[n.id].status }))}
        />
      </div>
    </Fragment>
  );
}

NodeDetails.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  details: PropTypes.instanceOf(Object),
};
