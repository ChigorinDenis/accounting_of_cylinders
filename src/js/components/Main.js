import React, { useEffect, useState} from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
import Modal from './Modal';
import FormAddBaloon from './FormAddBaloon'

export default () => {
  const [baloons, setBaloons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-baloons');
      setBaloons(data);
      return () => {
        ipcRenderer.removeAllListeners('get-baloons');
      };
    }
    fetchData(); 
  }, []);

  return (
    <>
    <Table striped>
      <Table.Header>
        <Table.Row>
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
          <Table.HeaderCell>Статус</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {baloons.map((baloon) => {
          const {
            id,
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
          const date = new Date(prod_date).getFullYear();
          return (
            <Table.Row key={`${id}${prod_number}`}>
              <Table.Cell>{prod_number}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{pressure_work}</Table.Cell>
              <Table.Cell>{volume}</Table.Cell>
              <Table.Cell>{shape}</Table.Cell>
              <Table.Cell>{env}</Table.Cell>
              <Table.Cell>{thickness}</Table.Cell>
              <Table.Cell>{diameter}</Table.Cell>
              <Table.Cell>{length}</Table.Cell>
              <Table.Cell>{mark}</Table.Cell>
              <Table.Cell>{gost}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
            </Table.Row>
          )
        })}
        
      </Table.Body>
      <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='12'>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
          >
            <Icon name='fire extinguisher' /> Добавить балон
          </Button>
          <Button size='small'>Approve</Button>
          <Button disabled size='small'>
            Approve All
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
    <Modal>
      <FormAddBaloon />
    </Modal>
    </>
    );
}