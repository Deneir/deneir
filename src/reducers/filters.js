import * as types from '../constants/action-types';

export default function filters(state = {}, action) {
  switch (action.type) {
    case types.SELECT_GROUP:
    case types.SET_FILTER:
      return setFilterReducer(state, action);
    case types.ADD_FILTER:
      if (state[action.filter] && state[action.filter].includes(action.value)) {
        return state;
      }
      return { ...state, [action.filter]: [...(state[action.filter] || []), action.value] };
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
  const availableFilters = {};

  Object.values(state.nodes).forEach((node) => {
    Object.keys(node.tags).forEach((tagId) => {
      if (!availableFilters[tagId]) {
        availableFilters[tagId] = [];
      }
      availableFilters[tagId].push(...node.tags[tagId]);
    });
  }, {});

  return Object.keys(availableFilters).reduce((res, filterKey) => {
    return { ...res, [filterKey]: [...new Set(availableFilters[filterKey])] };
  }, {});
}
