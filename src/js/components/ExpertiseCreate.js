import React, {useState, useEffect} from "react";
import Main from "./Main";
import { Form, Select, Input, Button, Message, Header} from "semantic-ui-react";
import formHandling from '../../utils/formHandling';


function ExpertiseCreate() {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [idBaloons, setIdBaloons] = useState([]);
  const [formData, setFormData] = useState({
    number: 'AE-21',
    date: '',
  });

  const { handleInputChange } = formHandling(formData, setFormData);

  const handleCreateExpertise = () => {
      const idExpertise = electron.ipcRenderer.sendSync('add-expertise', formData);
      electron.ipcRenderer.send('add-visual-control-items', {
        idExpertise,
        idBaloons
      });
      electron.ipcRenderer.send('add-ultrasonic-control-items', {
        idExpertise,
        idBaloons
      });
      electron.ipcRenderer.send('add-solid-control-items', {
        idExpertise,
        idBaloons
      });
      electron.ipcRenderer.send('add-pneumatic-control-items', {
        idExpertise,
        idBaloons
      });
  }


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

  const getData = async () => {
    const data = await electron.ipcRenderer.invoke('get-visual-control-items', 7);
    console.log(data);
  }
  
  return (
    <>
     
    <Header as='h3'>Новая экпертиза</Header>
    <Message 
      info
      style={{marginBottom: '30px'}}
    >
      <Message.Header>Экспертиза состоит из 4-х контролей</Message.Header>
      <Message.Content>
        1. Визуально-измерительный контроль,
        2. Ультразвуковая толщинометрия,
        3. Замеры твердости,
        4. Пневматические испытания.
      </Message.Content>
    </Message>
    <Form>
      <div
        style={{
          display: 'flex',
          gap: '30px',
        }}
      >
        <Form.Field
          id='form-input-control-number'
          name="number"
          control={Input}
          label='1. Введите номер экспертизы'
          placeholder='Номер экспертизы'
          value={formData.number}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-prod_date'
          name="date"
          control={Input}
          type="date"
          label='2. Выберите дату проведения экспертизы'
          placeholder='Дата проведения экспертизы'
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
    </Form>
    <Header as='h5'>3. Выберите сосуды для экпертизы</Header>
    <Main handleSet={setIdBaloons} />
    <Button onClick={getData}>
      Получить данные
    </Button>
    <Button
      primary
      floated="right"
      style={{
        marginBottom: "20px",
        marginTop: "20px"
      }}
      type="submit"
      onClick={handleCreateExpertise}
    >
      Создать экспертизу
    </Button>
    <p>{idBaloons.join(', ')}</p>
    </>
  )
}

export default ExpertiseCreate;