import { combineReducers } from 'redux';
import nodes from './nodes';
import filters from './filters';
import selectedNode from './selected-node';
import groupLevel from './group-level';

export default combineReducers({
  nodes,
  selectedNode,
  filters,
  groupLevel,
});
