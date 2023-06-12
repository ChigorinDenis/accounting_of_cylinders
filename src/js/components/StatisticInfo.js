import React, { useState, useEffect } from 'react'
import { Icon, Image, Statistic, Input, Form, Label, Table, Menu} from 'semantic-ui-react'
import formHandling from '../../utils/formHandling';
import getFailureProbability from '../../utils/countProbability';

const TableStatistic = ({ data }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Зав.номер</Table.HeaderCell>
        <Table.HeaderCell>Год выпуска</Table.HeaderCell>
        <Table.HeaderCell>Объем</Table.HeaderCell>
        <Table.HeaderCell>Форма</Table.HeaderCell>
        <Table.HeaderCell>Вероятность</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {data && data.map((baloon) => {
        return (
          <Table.Row key={baloon.id}>
            <Table.Cell>{baloon.prod_number}</Table.Cell>
            <Table.Cell>{baloon.prod_date}</Table.Cell>
            <Table.Cell>{baloon.volume}</Table.Cell>
            <Table.Cell>{baloon.shape}</Table.Cell>
            <Table.Cell>{baloon.probability}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4">
          <Menu floated="right" pagination>
            <Menu.Item as="a" icon>
              <Icon name="chevron left" />
            </Menu.Item>
            <Menu.Item as="a">1</Menu.Item>
            <Menu.Item as="a">2</Menu.Item>
            <Menu.Item as="a">3</Menu.Item>
            <Menu.Item as="a">4</Menu.Item>
            <Menu.Item as="a" icon>
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

const FormStatistic = () => {
  const [formData, setFormData] = useState({
    probability: 30,
    month: 12,   
  });

  const { handleInputChange, handleSelectChange } = formHandling(formData, setFormData);

  const handleSubmit = () => {
    // Отправка данных в главный процесс Electron
    electron.ipcRenderer.send('add-baloon', formData);
    
  };
  const formStyle = {
    marginTop: '30px',
    marginBottom: '30px'
  }
  return (
    <Form style={formStyle}>
      <Form.Group widths='equal' inline>
        <Form.Field
          name="probability"
          control={Input}
          label='Вероятность отказа'
          placeholder='Вероятность отказа'
          value={formData.probability}
          onChange={handleInputChange}
        />
        <Form.Field
          name="prod_date"
          control={Input}
          label='Месяцев до отказа'
          placeholder='Месяцев до отказа'
          value={formData.month}
          onChange={handleInputChange}
        />
        {/* <Form.Field
          control={Select}
          options={envOptions}
          label={{ children: 'Среда', htmlFor: 'form-select-env' }}
          placeholder='Среда'
          search
          searchInput={{ id: 'form-select-control-env'}}
          name="env"
          value={formData.env}
          onChange={handleSelectChange}
        /> */}
      </Form.Group>
    </Form>
  );
}

const StatisticInfo = ({data}) => {
  // const [inActiveBaloons, setInActiveBaloons] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const data = await electron.ipcRenderer.invoke('get-baloons-inactive');
  //     const dataProbability = data.map(baloon => {
  //       const probability = getFailureProbability(baloon.prod_date);
  //       return {...baloon, probability}
  //     });
  //     setInActiveBaloons(dataProbability);
  //     return () => {
  //       ipcRenderer.removeAllListeners('get-baloons-inactive');
  //     };
  //   }
  //   fetchData(); 
  // }, []);

  return (
    <div>
      <Label attached='top'>Статистика отказов</Label>
      <Statistic.Group widths='three' size='mini'>
        <Statistic color='red'>
          <Statistic.Value>30%</Statistic.Value>
          <Statistic.Label>
            Вероятность
            <br />
            отказа
          </Statistic.Label>
        </Statistic>

        <Statistic color='blue'>
          <Statistic.Value>
            38 месяцев
          </Statistic.Value>
          <Statistic.Label>
            Медиана
            <br />
            безотказной работы
          </Statistic.Label>
        </Statistic>

        <Statistic color='brown'>
          <Statistic.Value>
            5 ед.
          </Statistic.Value>
          <Statistic.Label>Количество<br/> сосудов</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <FormStatistic />
      <TableStatistic data={data}/>
    </div>
  )
};

export default StatisticInfo;