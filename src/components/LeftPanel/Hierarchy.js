import React from 'react';
import PropTypes from 'prop-types';
import FilterBlock from './FilterBlock';

export default function Hierarchy(props) {
  const { hierarchy, setGroupLevel, groupLevel } = props;
  const hierarchyOptions = [...hierarchy, 'node'];

  return (
    <FilterBlock title="hierarchy">
      <ul>
        {hierarchyOptions.map((groupLevelOption) => (
          <li key={groupLevelOption}>
            <input
              id={`hierarchy-${groupLevelOption}`}
              type="radio"
              name="hierarchy"
              value={groupLevelOption}
              checked={groupLevel === groupLevelOption}
              onChange={() => setGroupLevel(groupLevelOption)}
            />
            <label htmlFor={`hierarchy-${groupLevelOption}`}>{groupLevelOption}</label>
          </li>
        ))}
      </ul>
    </FilterBlock>
  );
}

Hierarchy.propTypes = {
  hierarchy: PropTypes.array.isRequired,
  groupLevel: PropTypes.string.isRequired,
  setGroupLevel: PropTypes.func.isRequired,
};
