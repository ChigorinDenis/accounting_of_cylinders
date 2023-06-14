import React, { useState } from 'react';
import { Form, Input  } from 'semantic-ui-react';
// import{ subDays, addYears, parseISO, format } from 'date-fns';

const FormAddEquipment = ({close}) => {
  const [formData, setFormData] = useState({
    name: '',
    prod_number: '',
    number: '',
    check_date: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSelectChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Отправка данных в главный процесс Electron
    const idEquipment= electron.ipcRenderer.sendSync('add-equipment', {
      name: formData.name,
      prod_number: formData.prod_number,
      
    });
    electron.ipcRenderer.send('add-certificate', {
      number: formData.number,
      check_date: formData.check_date,
      id_equipment: idEquipment
    })
    close();
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          name="name"
          control={Input}
          label='Название'
          placeholder='Название'
          value={formData.name}
          onChange={handleInputChange}
        />
        <Form.Field
          name="prod_number"
          control={Input}
          label='Зав.номер'
          placeholder='Зав.номер'
          value={formData.prod_number}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          name="number"
          control={Input}
          label='Сертификат поверки'
          placeholder='Сертификат поверки'
          value={formData.number}
          onChange={handleInputChange}
        />
        <Form.Field
          name="check_date"
          type='date'
          control={Input}
          label='Срок следующей поверки'
          placeholder='Срок следующей поверки'
          value={formData.check_date}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Button onClick={handleSubmit} positive >Сохранить</Form.Button>
    </Form>
  );
};

export default FormAddEquipment;