import { combineReducers } from 'redux';
import nodes from './nodes';
import filters from './filters';
import details from './details';
import groupLevel from './group-level';
import neighbourLevel from './neighbour-level';

export default combineReducers({
  nodes,
  filters,
  groupLevel,
  details,
  neighbourLevel,
});
