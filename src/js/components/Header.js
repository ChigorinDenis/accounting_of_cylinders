import React, { useState} from 'react'
import { Input, Menu} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../state/tabsSlice';


function Header() {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.tabs.activeTab);

  const handleItemClick = (e, { name }) => dispatch(setActiveTab(name));
  return (
    <div>
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
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
  
}

export default Header;