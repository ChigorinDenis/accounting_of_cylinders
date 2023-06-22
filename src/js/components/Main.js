import React, { useEffect, useState} from 'react';
import { Header, Checkbox, Icon, Table, Button, Label, Popup} from 'semantic-ui-react'
import Modal from './Modal';
import FormAddBaloon from './FormAddBaloon'
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenNewBaloon } from '../state/modalReducer';
import { setUnsurvivalBaloons } from '../state/baloonsReducer';
import FilterSelect  from './FilterSelect';
import { getTimeToFailure } from '../../utils/countProbability';
import fakeData from '../../../mathModel/fakeData';

const statusTag = (status) => {
  switch (status) {
    case 'InActive':
      return <Label basic color='green' size='mini'>Экплуатируется</Label>
    case 'Defective':
      return <Label basic color='red' size='mini'>Брак</Label>
    default:
      return <Label basic color='grey' size='mini'>Неопределен</Label>
  }
}
const monthLabel = (month) => {
  const color = month < 12? 'red' : month < 24? 'yellow' : month === 'grey';
  const timeRemain = month < 0 ? '1' : month;
  return (
    <Popup 
      content='Вероятность отказа более 10%'  
      trigger={
        <Label color={color} size='mini' >
          Время до отказа: 
          <Label.Detail>{timeRemain} мес.</Label.Detail>
        </Label>
      }
    />
  )
}
const filterData = (baloons, filter) => {
  if (filter === 'all') {
    return baloons;
  }
  return baloons.filter((baloon) => (baloon.status === filter));
}

export default ({ handleSet, footer = true, first = true }) => {

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
      const filteredData = filterData(mappedData, filter.baloon)
        .sort((a, b) => b.prod_date - a.prod_date);
      const dataRemainTime = filteredData
        .map(baloon => { 
          if (baloon.status === 'InActive') {
            const remainTime = getTimeToFailure(fakeData.survivalData, baloon.prod_date);
            return {...baloon, remain_time: remainTime };
          }
          return baloon;
        })
        .sort((a, b) => a.remain_time - b.remain_time);
      // filter.baloon === 'InActive'? setBaloons(dataRemainTime) : setBaloons(filteredData);
      setBaloons(dataRemainTime);
      const expertisePeriod = 6;
      const unsurvival = dataRemainTime.filter(baloon => baloon.remain_time <= expertisePeriod);
      dispatch(setUnsurvivalBaloons(unsurvival));
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
          {first &&<Table.HeaderCell>
            <Checkbox
              checked={allChecked}
              onChange={onChangeAll}
            />
          </Table.HeaderCell>}
          
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
          {footer&& <Table.HeaderCell>Состояние</Table.HeaderCell>}
          {footer && <Table.HeaderCell>Остаток<br/> ресурса</Table.HeaderCell>}
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
            status,
            remain_time
          } = baloon;
          // const date = new Date(prod_date).getFullYear();
          return (
            <Table.Row key={`${id}${prod_number}`}>
              {first && <Table.Cell>
                <Checkbox 
                  checked={checked}
                  onChange={onChange(id)}
                />
              </Table.Cell>}
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
              {footer && <Table.Cell>
                {statusTag(status)}
              </Table.Cell>}
              {footer &&<Table.Cell>
                {remain_time && monthLabel(remain_time)}
                </Table.Cell>}
              
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