import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import graphFunctions from './graph-functions';
import { selectGroup } from '../../actions/filters';
import { graphFormatter } from '../../reducers/nodes-selector';

export default function Graph(props) {
  const canvasRef = useRef(null);
  const {
    nodes, groupLevel, filters,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedNodeId } = useParams();

  useEffect(() => {
    const actions = {
      clickNode: (nodeId) => {
        if (nodes[nodeId].group) {
          return dispatch(selectGroup(groupLevel, nodeId));
        }
        return history.push(`/node/${nodeId}`);
      },
    };
    //  d3 setup
    const canvas = canvasRef.current;
    graphFunctions.initGraph(canvas, { data: graphFormatter(nodes), actions });
  }, [nodes, dispatch, groupLevel, history]);

  useEffect(() => {
    // select node zoom handler
    if (!selectedNodeId) {
      return;
    }
    graphFunctions.setCameraToNode(selectedNodeId);
  }, [selectedNodeId]);

  useEffect(() => {
    setTimeout(() => {
      graphFunctions.zoomFit();
    }, 600);
  }, [filters, groupLevel]);

  return <canvas id="graph" ref={canvasRef} className={styles.canvas}/>;
}

Graph.propTypes = {
  nodes: PropTypes.instanceOf(Object).isRequired,
  selectedNode: PropTypes.string,
  filters: PropTypes.instanceOf(Object),
  groupLevel: PropTypes.string,
};

Graph.defaultProps = {
  selectedNode: null,
};
