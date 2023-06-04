import React, { useEffect, useState } from "react";
import { Button, Icon, Table, Header} from "semantic-ui-react";
import { format, differenceInDays} from "date-fns";
// import Modal from "./Modal";
// import FormAddEquipment from "./FormAddEquipment";
const spanStyle = {
  color: 'red'
}
export default () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await electron.ipcRenderer.invoke("get-equipment");
      setEquipment(data);
      return () => {
        ipcRenderer.removeAllListeners("get-equipment");
      };
    }
    fetchData();
  }, []);

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
                  <Icon color='green' name='checkmark'  />
                </Table.Cell>
                <Table.Cell>
                  {format(date, 'dd.MM.yyyy')}
                  <br />
                  {(dateNow < date) && (differenceInDays(date, dateNow) < 10) && <span style={spanStyle}>осталось меньше 10дн.</span>}
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
              >
                <Icon name="plus" />
                Добавить оборудование
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      {/* <Modal>
        <FormAddEquipment />
      </Modal> */}
    </>
  );
};
