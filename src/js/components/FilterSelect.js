import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

// Импортируйте действия Redux Toolkit для обновления фильтра
import { setBaloonFilter } from '../state/filterReducer';

const FilterSelect = () => {
  const filter = useSelector(state => state.filter); // Получение текущего значения фильтра из Redux состояния
  const dispatch = useDispatch();

  const handleFilterChange = (event, { value }) => {
    dispatch(setBaloonFilter(value)); // Отправка нового значения фильтра в Redux состояние
  };

  return (
    <Dropdown
      selection
      options={[
        { key: 'all', value: 'all', text: 'Все' },
        { key: 'Defective', value: 'Defective', text: 'Брак' },
        { key: 'InActive', value: 'InActive', text: 'Эксплуатируется' },
      ]}
      value={filter.baloon}
      onChange={handleFilterChange}
    />
  );
};

export default FilterSelect;