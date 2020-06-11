import { combineReducers } from 'redux';
import nodes from './nodes';
import filters from './filters';
import details from './details';
import selectedNode from './selected-node';
import groupLevel from './group-level';
import neighbourLevel from './neighbour-level';

export default combineReducers({
  nodes,
  selectedNode,
  filters,
  groupLevel,
  details,
  neighbourLevel,
});
