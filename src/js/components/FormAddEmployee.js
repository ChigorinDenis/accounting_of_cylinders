import React, { useState } from 'react';
import { Form, Input  } from 'semantic-ui-react';

const FormAddEmployee = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    post: '',
    certificate_number: '',
    certificate_date: ''
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
    electron.ipcRenderer.send('add-employee', formData);
    console.log(formData);
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-fullname'
          name="fullname"
          control={Input}
          label='ФИО'
          placeholder='ФИО'
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-post'
          name="post"
          control={Input}
          label='Должность'
          placeholder='Должность'
          value={formData.post}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-certificate_number'
          name="certificate_number"
          control={Input}
          label='Номер сертификата'
          placeholder='Номер сертификата'
          value={formData.certificate_number}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-certificate_date'
          name="certificate_date"
          type='date'
          control={Input}
          label='Дата сертификата'
          placeholder='Дата сертификата'
          value={formData.certificate_date}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Button onClick={handleSubmit} positive >Сохранить</Form.Button>
    </Form>
  );
};

export default FormAddEmployee;