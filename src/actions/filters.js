import * as types from '../constants/action-types';

export function setFilter(filter, value) {
  return { type: types.SET_FILTER, filter, value };
}

export function setGroupLevel(groupLevel) {
  return { type: types.SET_GROUP_LEVEL, groupLevel };
}
export function selectGroup(groupId) {

}
