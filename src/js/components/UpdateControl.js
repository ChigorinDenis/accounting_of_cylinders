import React, { useState, useEffect, useMemo } from "react";
import { format } from 'date-fns'
import {
  Form,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Label,
  List,
} from "semantic-ui-react";
import formHandling from "../../utils/formHandling";

const TableInfo = ({ data, ptd }) => {
  const { controlData, controlEmployees, controlEquipment } = data;
  console.log('TableInfo')
  return (
    <>
      <Label basic color="red">
        Дата проведения
        <Label.Detail>
          {controlData && format(new Date(controlData.date), 'dd.MM.yyyy')}
        </Label.Detail>
      </Label>

      <Table celled structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Контроль произвели</Table.HeaderCell>
            <Table.HeaderCell>Инструменты для проведения</Table.HeaderCell>
            <Table.HeaderCell widths={1}>Объем контроля</Table.HeaderCell>
            <Table.HeaderCell widths={1}>
              НТД по оценке качества
            </Table.HeaderCell>
            {ptd && <Table.HeaderCell>ПТД на вид контроля</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <List>
                {controlEmployees &&
                  controlEmployees.map(({ id, fullname, post }) => (
                    <List.Item key={`${id}${fullname}`}>
                      <Label as="a" basic color="blue">
                        {`${fullname} - ${post}`}
                      </Label>
                    </List.Item>
                  ))}
              </List>
            </Table.Cell>
            <Table.Cell>
              <List>
                {controlEquipment &&
                  controlEquipment.map(({ id, name, prod_number }) => (
                    <List.Item key={`${id}${prod_number}`}>
                      <Label as="a" basic color="blue">
                        {`${name} №${prod_number}`}
                      </Label>
                    </List.Item>
                  ))}
              </List>
            </Table.Cell>
            <Table.Cell>
              {controlData && controlData.volme_control}
            </Table.Cell>
            <Table.Cell>
              {controlData && controlData.ntd_doc}
            </Table.Cell>
            {ptd && <Table.Cell>
              {controlData && controlData.ptd_doc}
            </Table.Cell>}
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

function UpdateControl({ routeName, ptd, data }) {
  // console.log('updateControl')
  const [saved, setSaved] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    employee: [],
    equipment: [],
    ptd_doc: "",
    ntd_doc: "",
    volme_control: "",
  });

  const { handleInputChange, handleSelectChange } = formHandling(
    formData,
    setFormData
  );

  const tableComponent = useMemo(() => {
    return <TableInfo data={data} ptd={ptd} />;
  }, [data, ptd]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const dataEmployees = await electron.ipcRenderer.invoke("get-employees");
      const dataEquipment = await electron.ipcRenderer.invoke("get-equipment");
      const mappedEmployees = dataEmployees.map(({ id, fullname }) => ({
        key: `${id}${fullname}`,
        text: fullname,
        value: id,
      }));
      const mappedEquipment = dataEquipment.map(
        ({ id, name, prod_number }) => ({
          key: `${id}${prod_number}`,
          text: `${name}  № ${prod_number}`,
          value: id,
        })
      );
      setEmployees(mappedEmployees);
      setEquipment(mappedEquipment);
      const { controlData } = data;
      if (controlData && controlData.length != 0) {
        setSaved(true);
      }
      return () => {
        ipcRenderer.removeAllListeners("get-employees");
        ipcRenderer.removeAllListeners("get-equipment");
      };
    }
    fetchData();
  }, [data]);

  const handleSubmit = () => {
    const idControl = 12;
    electron.ipcRenderer.send(`update-${routeName}`, {
      idControl,
      common: formData,
    });

    const idEquipments = formData.equipment;
    const idEmployees = formData.employee;
    electron.ipcRenderer.send(`add-${routeName}-equipment`, {
      idControl,
      idEquipments,
    });
    electron.ipcRenderer.send(`add-${routeName}-employee`, {
      idControl,
      idEmployees,
    });
  };

  return (
    <>
      {!saved && (
        <div>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Select}
                options={employees}
                label={{
                  children: "Сотрудники",
                  htmlFor: "form-select-employee",
                }}
                placeholder="Сотрудники"
                search
                searchInput={{ id: "form-select-control-employee" }}
                name="employee"
                action={{ icon: "search" }}
                multiple
                value={formData.employee}
                onChange={handleSelectChange}
              />

              <Form.Field
                control={Select}
                options={equipment}
                label={{
                  children: "Оборудование",
                  htmlFor: "form-select-equipment",
                }}
                placeholder="Оборудование"
                search
                searchInput={{ id: "form-select-control-equipment" }}
                name="equipment"
                multiple
                value={formData.equipment}
                onChange={handleSelectChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              {ptd && (
                <Form.TextArea
                  label="ПТД на вид контроля"
                  name="ptd_doc"
                  placeholder="Введите текст..."
                  value={formData.ptd_doc}
                  onChange={handleInputChange}
                />
              )}
              <Form.TextArea
                label="НТД по оценке качества"
                name="ntd_doc"
                placeholder="Введите текст..."
                value={formData.ntd_doc}
                onChange={handleInputChange}
              />

              <Form.TextArea
                label="Объем контроля"
                name="volme_control"
                placeholder="Введите текст..."
                value={formData.volme_control}
                onChange={handleInputChange}
              />
            </Form.Group>
              <Form.Field
                id="form-input-control-prod_date"
                name="date"
                control={Input}
                type="date"
                style={{width: '50%'}}
                label="Дата проведения"
                placeholder="Дата проведения"
                value={formData.date}
                onChange={handleInputChange}
              />
            <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={handleSubmit}
              >
                <Icon name="save" />
                Сохранить
              </Button>
          </Form>
        </div>
      )}
      {saved && (
        <div>
          {tableComponent}
        </div>
      )}
    </>
  );
}

export default UpdateControl;
