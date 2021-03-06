import React from 'react';
import PropTypes from 'prop-types';
import FilterBlock from './FilterBlock';
import styles from './Filter.module.scss';

export default function Filter(props) {
  const {
    filters = [], values, filterId, onChange,
  } = props;

  return (
    <FilterBlock title={filterId} initialOpen={false}>
      <ul className={styles.filterList}>
        {values.map((value) => (
          <li key={value} className={styles.filterOption}>
            <input
              className={styles.checkbox}
              checked={filters.includes(value)}
              id={`${filterId}-${value}`}
              type="checkbox"
              value={value}
              onChange={() => onChange(filterId, value)}
            />
            <label htmlFor={`${filterId}-${value}`}>{value}</label>
          </li>
        ))}
      </ul>
    </FilterBlock>
  );
}

Filter.propTypes = {
  filters: PropTypes.array,
  values: PropTypes.array.isRequired,
  filterId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
