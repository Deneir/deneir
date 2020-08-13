import * as types from '../constants/action-types';
import { getConfig } from '../services/read-config';

export function setFilter(filter, value) {
  return { type: types.SET_FILTER, filter, value };
}
export function addFilter(filter, value) {
  return { type: types.ADD_FILTER, filter, value };
}

export function setGroupLevel(groupLevel) {
  return { type: types.SET_GROUP_LEVEL, groupLevel };
}

export function selectGroup(groupLevel, groupId) {
  const hierarchy = [...getConfig('hierarchy'), 'node'];
  const filter = groupLevel;
  const value = groupId;
  const newGroupLevel = hierarchy[hierarchy.indexOf(groupLevel) + 1];

  return {
    type: types.SELECT_GROUP,
    groupLevel: newGroupLevel,
    filter,
    value,
  };
}
export function setNeighbourLevel(neighbourLevel) {
  return { type: types.SET_NEIGHBOUR_LEVEL, neighbourLevel };
}
