import { combineReducers } from 'redux';
import nodes from './nodes';
import filters from './filters';
import selectedNode from './selected-node';

export default combineReducers({
  nodes,
  selectedNode,
  filters,
});
