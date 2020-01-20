import { combineReducers } from 'redux';
import graph from './graph';
import nodes from './nodes';
import status from './status';
import panel from './panel';

export default combineReducers({
  graph,
  nodes,
  status,
  panel,
});
