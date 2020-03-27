import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNode } from '../actions/nodes';
import { getNodeDetails } from '../reducers/nodes-selector';
import NodeDetails from '../components/NodeDetails';
import GeneralInfoPanel from '../components/GeneralInfoPanel';
import styles from './PanelContainer.module.scss';

export default function PanelContainer() {
  const dispatch = useDispatch();

  const nodes = useSelector((state) => state.nodes);
  const selectedNode = useSelector((state) => {
    if (!state.selectedNode) {
      return null;
    }
    return getNodeDetails(state.nodes, state.selectedNode);
  });
  const actions = {
    selectNode: (id) => dispatch(selectNode(id)),
  };

  return (
    <section className={styles.panel}>
      {selectedNode && (
        <NodeDetails selectedNode={selectedNode} actions={actions} />
      )}
      {!selectedNode && <GeneralInfoPanel nodes={nodes} actions={actions} />}
      </section>
  );
}
