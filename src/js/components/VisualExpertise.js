import React, {useState, useEffect} from "react";
import Main from "./Main";
import { Form, Select, Input, Button} from "semantic-ui-react";


function VisualExpertise() {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const dataEmployees = await electron.ipcRenderer.invoke('get-employees');
      const dataEquipment = await electron.ipcRenderer.invoke("get-equipment");
      const mappedEmployees = dataEmployees.map(({id, fullname}) => ({
        key: `${id}${fullname}`,
        text: fullname,
        value: id,
      }));
      const mappedEquipment = dataEquipment.map(({id, name, prod_number}) => ({
        key: `${id}${prod_number}`,
        text: `${name}  № ${prod_number}`,
        value: id,
      }))
      setEmployees(mappedEmployees);
      setEquipment(mappedEquipment);
      return () => {
        ipcRenderer.removeAllListeners('get-employees');
        ipcRenderer.removeAllListeners('get-equipment');
      };
    }
    fetchData(); 
  }, []);
  return (
    <>
    <h1>VisualExpertise</h1>
    <Form>
      <Form.Field
          id='form-input-control-prod_date'
          name="prod_date"
          control={Input}
          type="date"
          label='Дата экспертизы'
          placeholder='Дата экспертизы'
          
      />
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          options={employees}
          label={{ children: 'Сотрудники', htmlFor: 'form-select-employee' }}
          placeholder='Сотрудники'
          search
          searchInput={{ id: 'form-select-control-employee'}}
          name="env"
          action={{ icon: 'search' }}
          multiple
        />
        
        <Form.Field
          control={Select}
          options={equipment}
          label={{ children: 'Оборудование', htmlFor: 'form-select-equipment' }}
          placeholder='Оборудование'
          search
          searchInput={{ id: 'form-select-control-equipment'}}
          name="env"
          multiple
        />
      </Form.Group>
    </Form>
    <Main />
    </>
  )
}

export default VisualExpertise;