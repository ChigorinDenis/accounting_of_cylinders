import React from "react";
import {
  Table,
  Label,
  List,
} from "semantic-ui-react";
import { format } from 'date-fns'

const TableInfo = ({ data, ptd, type_doc, ntd, quality_doc, volme, date}) => {
  const { controlData, controlEmployees, controlEquipment } = data;
  const dateEnd = controlData.date? controlData.date: date;
  return (
    <>
      <Label basic color="green">
        Дата проведения
        <Label.Detail>
          {format(new Date(dateEnd), 'dd.MM.yyyy')}
        </Label.Detail>
      </Label>

      <Table celled structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Контроль произвели</Table.HeaderCell>
            <Table.HeaderCell>Инструменты для проведения</Table.HeaderCell>
            {volme && <Table.HeaderCell widths={1}>Объем контроля</Table.HeaderCell>}
            {ntd && <Table.HeaderCell widths={1}>
              НТД по оценке качества
            </Table.HeaderCell>}
            {quality_doc && <Table.HeaderCell widths={1}>
              НТД по оценке качества
            </Table.HeaderCell>}
            {type_doc && <Table.HeaderCell widths={1}>
              НТД на вид контроля
            </Table.HeaderCell>}
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
            {volme && <Table.Cell>
              {controlData && controlData.volme_control}
            </Table.Cell>}
            {ntd && <Table.Cell>
              {controlData && controlData.ntd_doc}
            </Table.Cell>}
            {type_doc && <Table.Cell>
              {controlData && controlData.ntd_type_doc}
            </Table.Cell>}
            {quality_doc && <Table.Cell>
              {controlData && controlData.ntd_quality_doc}
            </Table.Cell>}
            {ptd && <Table.Cell>
              {controlData && controlData.ptd_doc}
            </Table.Cell>}
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default TableInfo;