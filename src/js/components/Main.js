import React, { useEffect, useState} from 'react';
import { Header, Checkbox, Icon, Table, Button, Label} from 'semantic-ui-react'
import Modal from './Modal';
import FormAddBaloon from './FormAddBaloon'
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenNewBaloon } from '../state/modalReducer';
import FilterSelect  from './FilterSelect';

const statusTag = (status) => {
  switch (status) {
    case 'InActive':
      return <Label basic color='green'>Экплуатируется</Label>
    case 'Defective':
      return <Label basic color='red'>Брак</Label>
    default:
      return <Label basic color='grey'>Неопределен</Label>
  }
}

const filterData = (baloons, filter) => {
  if (filter === 'all') {
    return baloons;
  }
  return baloons.filter((baloon) => (baloon.status === filter));
}

export default ({ handleSet, footer = true }) => {

  const [baloons, setBaloons] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const dispatch = useDispatch();

  const isOpenNewBaloon = useSelector(state => state.modal.isOpenNewBaloon);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-baloons');
      const mappedData = data.map((baloon) => ({...baloon, checked: false}));
      const filteredData = filterData(mappedData, filter.baloon);
      setBaloons(filteredData);
      return () => {
        ipcRenderer.removeAllListeners('get-baloons');
      };
    }
    fetchData(); 
  }, [filter, isOpenNewBaloon]);


  const handleClose = () => {
    dispatch(setIsOpenNewBaloon(false));
  }
  const onChangeAll = () => {
    setAllChecked(!allChecked)
    const newBaloons = baloons.map((baloon) => ({...baloon, checked: !allChecked}));
    setBaloons(newBaloons);
    const baloonsIds = newBaloons.reduce((acc, baloon) => {
      if (baloon.checked) {
        return [...acc, baloon.id]
      }
      return acc;
    }, []);
    handleSet && handleSet(baloonsIds);
  }

  const onChange = (id) => () => {
    const newBaloons = baloons.map((baloon) => {
      if (baloon.id === id) {
        return {
          ...baloon,
          checked: !baloon.checked
        }
      }
      return baloon;
    });
    setBaloons(newBaloons);
    const baloonsIds = newBaloons.reduce((acc, baloon) => {
      if (baloon.checked) {
        return [...acc, baloon.id]
      }
      return acc;
    }, []);
    handleSet && handleSet(baloonsIds);
  }

  return (
    <>
    {footer && <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'middle',
      marginTop: '30px',
      marginBottom: '20px' 
    }}>
      <Header style={{marginRight: '10px'}} as='h3'>Сосуды</Header>
      <FilterSelect style={{marginRight: '10px'}}/>
      <Button
        floated='right'
        icon
        labelPosition='left'
        primary
        size='small'
        onClick={() => {
          dispatch(setIsOpenNewBaloon(true))
        }}
        style={{marginLeft: 'auto'}}
      >
        <Icon name='fire extinguisher' /> Добавить балон
      </Button>
    </div>}
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox
              checked={allChecked}
              onChange={onChangeAll}
            />
          </Table.HeaderCell>
          
          <Table.HeaderCell>Зав.номер</Table.HeaderCell>
          <Table.HeaderCell>Дата производства</Table.HeaderCell>
          <Table.HeaderCell>Рабочее давление</Table.HeaderCell>
          <Table.HeaderCell>Объем</Table.HeaderCell>
          <Table.HeaderCell>Форма</Table.HeaderCell>
          <Table.HeaderCell>Среда</Table.HeaderCell>
          <Table.HeaderCell>Толщина</Table.HeaderCell>
          <Table.HeaderCell>Диаметр</Table.HeaderCell>
          <Table.HeaderCell>Длина</Table.HeaderCell>
          <Table.HeaderCell>Марка</Table.HeaderCell>
          <Table.HeaderCell>Гост</Table.HeaderCell>
          <Table.HeaderCell>Состояние</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {baloons.map((baloon) => {
          const {
            id,
            checked,
            prod_number,
            prod_date,
            pressure_work,
            shape,
            volume,
            env,
            thickness,
            diameter,
            length,
            mark,
            gost,
            status
          } = baloon;
          // const date = new Date(prod_date).getFullYear();
          return (
            <Table.Row key={`${id}${prod_number}`}>
              <Table.Cell>
                <Checkbox 
                  checked={checked}
                  onChange={onChange(id)}
                />
              </Table.Cell>
              <Table.Cell>{prod_number}</Table.Cell>
              <Table.Cell>{prod_date}</Table.Cell>
              <Table.Cell>{pressure_work}</Table.Cell>
              <Table.Cell>{volume}</Table.Cell>
              <Table.Cell>{shape}</Table.Cell>
              <Table.Cell>{env}</Table.Cell>
              <Table.Cell>{thickness}</Table.Cell>
              <Table.Cell>{diameter}</Table.Cell>
              <Table.Cell>{length}</Table.Cell>
              <Table.Cell>{mark}</Table.Cell>
              <Table.Cell>{gost}</Table.Cell>
              <Table.Cell>{statusTag(status)}</Table.Cell>
            </Table.Row>
          )
        })}
        
      </Table.Body>
      <Table.Footer fullWidth>
      {footer && <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='12'>
        </Table.HeaderCell>
      </Table.Row>}
    </Table.Footer>
    </Table>
    <Modal open={isOpenNewBaloon} close={setIsOpenNewBaloon}>
      <FormAddBaloon close={handleClose}/>
    </Modal>
    </>
    );
}