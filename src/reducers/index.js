import { combineReducers } from 'redux';
import graph, { canvas } from './graph';
import nodes from './nodes';
import status from './status';
import panel from './panel';

export default combineReducers({
  graph,
  canvas,
  nodes,
  status,
  panel,
});
