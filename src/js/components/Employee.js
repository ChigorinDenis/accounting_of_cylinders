import React, { useEffect, useState} from 'react';
import { Button, Header, Icon, Table } from 'semantic-ui-react'
import { format } from 'date-fns'
import Modal from './Modal';
import FormAddEmployee from './FormAddEmployee';
import { setIsOpenNewEmployee } from '../state/modalReducer';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const [employees, setEmployees] = useState([]);
  const isOpenNewEmployee = useSelector(state => state.modal.isOpenNewEmployee);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-employees');
      setEmployees(data);
      return () => {
        ipcRenderer.removeAllListeners('get-employees');
      };
    }
    fetchData(); 
  }, []);

  return (
    <>
    <Header style={{marginTop: '30px', marginBottom: '20px'}} as='h3'>Персонал</Header>
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Полное имя</Table.HeaderCell>
          <Table.HeaderCell>Должность</Table.HeaderCell>
          <Table.HeaderCell>Номер сертификата</Table.HeaderCell>
          <Table.HeaderCell>Дата сертификата</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {employees.map((employee) => {
          const {
            id,
            fullname,
            post,
            certificate_number,
            certificate_date,
          } = employee;
          const date = new Date(certificate_date);
          return (
            <Table.Row key={`${id}${fullname}`}>
              <Table.Cell>{fullname}</Table.Cell>
              <Table.Cell>{post}</Table.Cell>
              <Table.Cell>{certificate_number}</Table.Cell>
              <Table.Cell>{format(date, 'dd.MM.yyyy')}</Table.Cell>
            </Table.Row>
          )
        })}
        
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='11'>
            <Button
              floated='right'
              icon
              labelPosition='left'
              primary
              size='small'
              onClick={() => {
                dispatch(setIsOpenNewEmployee(true))
              }}
            >
              <Icon name='user' /> Добавить сотрудника
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    <Modal open={isOpenNewEmployee} close={setIsOpenNewEmployee}>
      <FormAddEmployee />
    </Modal>
    </>
    );
}