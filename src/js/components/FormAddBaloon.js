import React, { useState } from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const shapeOptions = [
  { key: 'c', text: 'Цилиндр', value: 'Цилиндр' },
  { key: 't', text: 'Тороид', value: 'Тороид' }
];

const envOptions = [
  { key: 'o', text: 'Кислород', value: 'Кислород' },
  { key: 'n', text: 'Азот', value: 'Азот' },
  { key: 'ar', text: 'Аргон', value: 'Аргон' },
  { key: 'h', text: 'Водород', value: 'Водород' }
]

const FormAddBaloon = () => {
  const [formData, setFormData] = useState({
    prod_number: '123',
    prod_date: 1985,
    pressure_work: 10.5,
    shape: 'Тороид',
    volume: 10.0,
    env: 'Азот',
    thickness: 11,
    diameter: 11,
    length: 11,
    mark: '38ХА',
    gost: 'ГОСТ 4247-71',
    status: 'Активный'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    console.log('name', name, value)
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
    electron.ipcRenderer.send('add-baloon', formData);
    console.log(formData);
  };

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-prod_number'
          name="prod_number"
          control={Input}
          label='Заводской номер'
          placeholder='Заводской номер'
          value={formData.prod_number}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-prod_date'
          name="prod_date"
          control={Input}
          label='Дата производства'
          placeholder='Дата производства'
          value={formData.prod_date}
          onChange={handleInputChange}
        />
        <Form.Field
          control={Select}
          options={envOptions}
          label={{ children: 'Среда', htmlFor: 'form-select-env' }}
          placeholder='Среда'
          search
          searchInput={{ id: 'form-select-control-env'}}
          name="env"
          value={formData.env}
          onChange={handleSelectChange}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-pressure_work'
          name='pressure_work'
          control={Input}
          label='Рабочее давление'
          placeholder='кг/см2'
          value={formData.pressure_work}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-volume'
          name='volume'
          control={Input}
          label='Объем, л'
          placeholder='литр'
          value={formData.volume}
          onChange={handleInputChange}
        />
        <Form.Field
          control={Select}
          options={shapeOptions}
          label={{ children: 'Форма', htmlFor: 'form-select-shape' }}
          placeholder='Форма'
          search
          searchInput={{ id: 'form-select-control-shape'}}
          name='shape'
          value={formData.shape}
          onChange={handleSelectChange}
        />

      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-mark'
          name='mark'
          control={Input}
          label='Марка стали'
          placeholder='Марка стали'
          value={formData.mark}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-gost'
          name='gost'
          control={Input}
          label='ГОСТ'
          placeholder='ГОСТ стали'
          value={formData.gost}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-thickness'
          name='thickness'
          control={Input}
          label='Толщина стенки, мм'
          placeholder='мм'
          value={formData.thickness}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-diameter'
          name='diameter'
          control={Input}
          label='Внутренний диаметр, мм'
          placeholder='мм'
          value={formData.diameter}
          onChange={handleInputChange}
        />
        <Form.Field
          id='form-input-control-length'
          name='length'
          control={Input}
          label='Длина, мм'
          placeholder='мм'
          value={formData.length}
          onChange={handleInputChange}
        />  
      </Form.Group>
      <Button
        onClick={handleSubmit}
        type="submit" 
        positive
      >
        Добавить
      </Button>
    </Form>
  );
}

export default FormAddBaloon;