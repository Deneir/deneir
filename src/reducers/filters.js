import * as types from '../constants/action-types';

export default function filters(state = {}, action) {
  switch (action.type) {
    case types.SET_FILTER:
      return setFilterReducer(state, action);
    default:
      return state;
  }
}

function setFilterReducer(state, action) {
  const newState = { ...state };
  const previousFilter = state[action.filter] || [];

  if (!previousFilter.includes(action.value)) {
    newState[action.filter] = [...previousFilter, action.value];
    return newState;
  }
  const valueIndex = previousFilter.indexOf(action.value);
  const newFilter = [
    ...previousFilter.slice(0, valueIndex),
    ...previousFilter.slice(valueIndex + 1),
  ];

  newState[action.filter] = newFilter;

  if (!newFilter.length) {
    delete newState[action.filter];
  }
  return newState;
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
