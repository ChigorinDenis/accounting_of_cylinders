import React, { useState, useEffect } from 'react'
import { Icon, Image, Statistic, Input, Form, Label, Table, Menu, Button, Select} from 'semantic-ui-react'
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
        <Table.HeaderCell colSpan="5">
          {/* <Menu floated="right" pagination>
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
          </Menu> */}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);


const probabilityOptions = [
  { key: '30p', text: '<30%', value: 30 },
  { key: '40p', text: '<40%', value: 40},
  { key: '50p', text: '<60%', value: 60},
  { key: '70p', text: '<75%', value: 75},
];

const monthOptions = [
  { key: '0m', text: 'на сегодня', value: 0 },
  { key: '6m', text: '6 месяцев', value: 6 },
  { key: '1year', text: '1 год', value: 12},
  { key: '15year', text: '1 год 6 месяцев', value: 18},
  { key: '2year', text: '2 года', value: 24},
  { key: '3year', text: '3 года', value: 36},
];
const FormStatistic = ({params}) => {
  const [formData, setFormData] = useState({
    probability: params.probability,
    month: params.month,   
  });

  const handleSelectChange = (f) => (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
    f(value);
  };

  const handleSubmit = () => {
    params.setProbability(formData.probability);
    params.setMonth(formData.month);
  };

  const formStyle = {
    marginTop: '30px',
    marginBottom: '30px'
  }
  return (
    <Form style={formStyle}>
      <Form.Group widths='equal' inline>
        {/* <Form.Field
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
        /> */}
        <Form.Field
          control={Select}
          options={monthOptions}
          label={{ children: 'Время до отказа', htmlFor: 'form-select-month' }}
          placeholder='Время до отказа'
          search
          searchInput={{ id: 'form-select-control-month' }}
          name="month"
          value={formData.month}
          onChange={handleSelectChange(params.setMonth)}
        />
        <Form.Field
          control={Select}
          options={probabilityOptions}
          label={{ children: 'Вероятность', htmlFor: 'form-select-probability' }}
          placeholder='Вероятность отказа'
          search
          searchInput={{ id: 'form-select-control-probability' }}
          name="probability"
          value={formData.probability}
          onChange={handleSelectChange(params.setProbability)}
        />
        {/* <Button color='blue' onClick={handleSubmit}>ОК</Button> */}
      </Form.Group>
    </Form>
  );
}

const StatisticInfo = ({data, params}) => {
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
          <Statistic.Value>{params.probability}%</Statistic.Value>
          <Statistic.Label>
            Вероятность
            <br />
            отказа
          </Statistic.Label>
        </Statistic>

        <Statistic color='blue'>
          <Statistic.Value>
            {params.month} месяцев
          </Statistic.Value>
          <Statistic.Label>
            Медиана
            <br />
            безотказной работы
          </Statistic.Label>
        </Statistic>

        <Statistic color='brown'>
          <Statistic.Value>
            {data && data.length || 0} ед.
          </Statistic.Value>
          <Statistic.Label>Количество<br/> сосудов</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <FormStatistic  params={params}/>
      <TableStatistic data={data}/>
    </div>
  )
};

export default StatisticInfo;