import * as types from '../constants/action-types';

export default function setFilter(filter, value) {
  return { type: types.SET_FILTER, filter, value };
}
