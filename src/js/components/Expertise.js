import React, { useEffect, useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { format, differenceInDays} from "date-fns";
// import Modal from "./Modal";
// import FormAddEquipment from "./FormAddEquipment";
const spanStyle = {
  color: 'red'
}
export default () => {
  const [expertise, setExpertise] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await electron.ipcRenderer.invoke("get-expertise");
      setExpertise(data);
      return () => {
        ipcRenderer.removeAllListeners("get-expertise");
      };
    }
    fetchData();
  }, []);

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер</Table.HeaderCell>
            <Table.HeaderCell>Дата проведения</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expertise.map((item) => {
            const { id, number, date} = item;
            const date_exp = new Date(date);
            return (
              <Table.Row key={`${id}${number}`}>
                <Table.Cell>{number}</Table.Cell>
                <Table.Cell>{format(date_exp, 'dd.MM.yyyy')}</Table.Cell>
                <Table.Cell>
                  <Button basic color="blue">Результаты</Button>
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
              <Button size="small">Approve</Button>
              <Button disabled size="small">
                Approve All
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
