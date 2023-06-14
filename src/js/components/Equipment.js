import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon, Table, Header} from "semantic-ui-react";
import { format, differenceInDays} from "date-fns";
import Modal from "./Modal";
import FormAddEquipment from "./FormAddEquipment";
import { setIsOpenNewEquipment } from "../state/modalReducer";


const spanStyle = {
  color: 'red'
}

export default () => {
  const [equipment, setEquipment] = useState([]);
  const isOpenNewEquipment = useSelector(state => state.modal.isOpenNewEquipment);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await electron.ipcRenderer.invoke("get-equipment");
      setEquipment(data);
      return () => {
        ipcRenderer.removeAllListeners("get-equipment");
      };
    }
    fetchData();
  }, [isOpenNewEquipment]);

  const handleClose = () => {
    dispatch(setIsOpenNewEquipment(false));
  }

  return (
    <>
      <Header style={{marginTop: '30px', marginBottom: '20px'}} as='h3'>Оборудование</Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.HeaderCell>Заводской номер</Table.HeaderCell>
            <Table.HeaderCell>Сертификат поверки</Table.HeaderCell>
            <Table.HeaderCell>Срок поверки</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {equipment.map((item) => {
            const { id, name, prod_number, number, check_date } = item;
            const date = new Date(check_date);
            const dateNow = new Date()
            return (
              <Table.Row key={`${id}${name}`}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{prod_number}</Table.Cell>
                <Table.Cell>
                  <Icon name='file alternate outline' />
                  {number}
                  {/* <Icon color='green' name='checkmark'  /> */}
                </Table.Cell>
                <Table.Cell>
                  {format(date, 'dd.MM.yyyy')}
                  <br />
                  {(dateNow < date) && (differenceInDays(date, dateNow) < 40) && <span style={spanStyle}>Истекает срок</span>}
                  {(dateNow > date) &&  <span style={spanStyle}>Срок истек</span>}
                  </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => {
                  dispatch(setIsOpenNewEquipment(true))
                }}
              >
                <Icon name="plus" />
                Добавить оборудование
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Modal open={isOpenNewEquipment} close={setIsOpenNewEquipment}>
        <FormAddEquipment close={handleClose}/>
      </Modal>
    </>
  );
};
