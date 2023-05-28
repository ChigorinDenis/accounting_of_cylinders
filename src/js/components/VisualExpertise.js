import React, { useState, useEffect } from "react";
import Main from "./Main";
import { Form, Select, Input, Button, Icon } from "semantic-ui-react";
import formHandling from "../../utils/formHandling";

function VisualExpertise({ route, ptd }) {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    employee: [],
    equipment: [],
    ptd_doc: "",
    ntd_doc: "",
    volme_control: ""
  });
  const { handleInputChange, handleSelectChange } = formHandling(
    formData,
    setFormData
  );

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
      return () => {
        ipcRenderer.removeAllListeners("get-employees");
        ipcRenderer.removeAllListeners("get-equipment");
      };
    }
    fetchData();
  }, []);

  const handleSubmit = () => {
    console.log(formData);
    const idVisualControls = [15, 16]
    electron.ipcRenderer.send('update-visual-control-items-by-common', {
      idVisualControls,
      common: formData
    });
  };

  return (
    <>
      <h1>VisualExpertise</h1>
      <Form>
        <Form.Field
          id="form-input-control-prod_date"
          name="date"
          control={Input}
          type="date"
          label="Дата проведения"
          placeholder="Дата проведения"
          value={formData.date}
          onChange={handleInputChange}
        />

        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            options={employees}
            label={{ children: "Сотрудники", htmlFor: "form-select-employee" }}
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
      </Form>
      <Button
        floated='right'
        icon
        labelPosition='left'
        primary
        size='small'
        onClick={handleSubmit}
      >
        <Icon name='save' />Сохранить
      </Button>
    </>
  );
}

export default VisualExpertise;
