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
import TableInfo from "./TableInfo";


function UpdateControl({ routeName, ptd, type_doc, ntd, quality_doc, data, volme = true, setIsUpdate }) {
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
    ntd_type_doc: "",
    ntd_quality_doc: "",
    volme_control: "",
  });

  const { handleInputChange, handleSelectChange } = formHandling(
    formData,
    setFormData
  );

  const tableComponent = useMemo(() => {
    return <TableInfo data={data} ptd={ptd || formData.ptd_doc} type_doc={type_doc || formData.ntd_type_doc} ntd={ntd || formData.ntd_doc} quality_doc={quality_doc || formData.ntd_quality_doc} volme={volme || formData.volme_control} />;
  }, [data, ptd, type_doc, ntd, quality_doc, volme]);

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

      if (controlData && controlData.name === 'filled') {
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
    const { controlData } = data;
    const idControl = controlData.id;
    const common = { ...formData, name: 'filled'};

    electron.ipcRenderer.send(`update-${routeName}`, {
      idControl,
      common
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

    setIsUpdate('updated');
    setSaved(true);
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
              {type_doc && (
                <Form.TextArea
                  label="НТД на вид котроля"
                  name="ntd_type_doc"
                  placeholder="Введите текст..."
                  value={formData.ntd_type_doc}
                  onChange={handleInputChange}
                />
              )}
              {quality_doc && <Form.TextArea
                label="НТД по оценке качества"
                name="ntd_quality_doc"
                placeholder="Введите текст..."
                value={formData.ntd_quality_doc}
                onChange={handleInputChange}
              />}
              {ntd && <Form.TextArea
                label="НТД по оценке качества"
                name="ntd_doc"
                placeholder="Введите текст..."
                value={formData.ntd_doc}
                onChange={handleInputChange}
              />}

              {volme && <Form.TextArea
                label="Объем контроля"
                name="volme_control"
                placeholder="Введите текст..."
                value={formData.volme_control}
                onChange={handleInputChange}
              />}
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
