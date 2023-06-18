import React, { useState} from 'react'
import { Input, Menu, Sticky} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../state/tabsSlice';



function Header({ contextRef }) {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.tabs.activeTab);

  const handleItemClick = (e, { name }) => dispatch(setActiveTab(name));
  return (
    <Sticky context={contextRef}>
      <Menu  inverted>
        <Menu.Item
          name='сосуды'
          active={activeItem === 'сосуды'}
          onClick={handleItemClick}
          color="blue"
        />
        <Menu.Item
          name='оборудование'
          active={activeItem === 'оборудование'}
          onClick={handleItemClick}
          color="blue"
        />
        <Menu.Item
          name='персонал'
          active={activeItem === 'персонал'}
          onClick={handleItemClick}
          color="blue"
        />
        <Menu.Item
          name='экспертиза'
          active={activeItem === 'экспертиза'}
          onClick={handleItemClick}
          color="blue"
        />
        <Menu.Item
          name='прогнозирование'
          active={activeItem === 'прогнозирование'}
          onClick={handleItemClick}
          color="blue"
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Поиск...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Sticky>
  )
  
}

export default Header;