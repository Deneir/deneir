import * as types from '../constants/action-types';

export default function filters(state = {}, action) {
  switch (action.type) {
    case types.SET_FILTER:
      return { ...state, [action.filter]: action.value };
    default:
      return state;
  }
}

export function getAvailableFilters(state) {
  return Object.values(state.nodes).reduce((availableFilters, node) => {
    Object.keys(node.tags).forEach((tagId) => {
      const tagValue = node.tags[tagId];
      if (!availableFilters[tagId]) {
        /* eslint-disable no-param-reassign */
        availableFilters[tagId] = [];
      }
      if (!availableFilters[tagId].includes(tagValue)) {
        availableFilters[tagId].push(tagValue);
      }
    });
    return availableFilters;
  }, {});
}
