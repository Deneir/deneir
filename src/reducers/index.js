import { combineReducers } from 'redux';
import nodes from './nodes';
import selectedNode from './selected-node';

export default combineReducers({
  nodes,
  selectedNode,
});
