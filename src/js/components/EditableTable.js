import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Icon, Label} from 'semantic-ui-react';

const EditableTable = ({ tableHeader, data, submit, actionCell, limit }) => {
  const [editingCell, setEditingCell] = useState(null); // Хранение информации о редактируемой ячейке
  const [tableData, setTableData] = useState([]);
  const [changedRow, setChangedRow] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data, actionCell]);

  const handleCellClick = (rowId, field) => {
    setEditingCell({ rowId, field });
  };

  const handleCellChange = (event, rowId, field) => {
    const newValue = event.target.value;
    setTableData((prevData) => {
      const newData = prevData.map((row) => {
        if (row.id === rowId) {
          return { ...row, [field]: newValue };
        }
        return row;
      });
      return newData;
    });
  };

  const handleCellBlur = (row, field) => {
    setEditingCell(null);
    const changedRowIndex = changedRow.findIndex((item) => item.id === row.id);
    if (changedRowIndex !== -1) {
      // Изменения уже были в записи, обновляем ее
      const updatedChangedRow = [...changedRow];
      updatedChangedRow[changedRowIndex][field] = row[field];
      // Обновляем состояние changedRow
      setChangedRow(updatedChangedRow);
    } else {
      // Изменения в записи еще не было, добавляем новую запись
      const newChangedRow = { ...row };
      // Обновляем состояние changedRow
      setChangedRow([...changedRow, newChangedRow]);
    }
    console.log(changedRow);
  };

  const updateTableData = (tableData, row, value) => {
    const updatedTableData = tableData.map((rowData) => {
      if (rowData.id === row.id) {
        return { ...rowData, check_result: value }; // Изменение поля "check" на true
      }
      return rowData;
    });
   

    const updatedChangedRow = [...changedRow];
    const changedRowIndex = updatedChangedRow.findIndex((item) => item.id === row.id);
    if (changedRowIndex !== -1) {
      // Изменения уже были в записи, обновляем ее
      updatedChangedRow[changedRowIndex].check_result = value;
    } else {
      // Изменения в записи еще не было, добавляем новую запись
      const newChangedRow = { ...row, check_result: value };
      updatedChangedRow.push(newChangedRow);
    }
    setTableData(updatedTableData);
    setChangedRow(updatedChangedRow);
  };

  const spanBuild = (field, value) => {
    if (field === 'check_result') {
      switch (value) {
        case 0:
          return <Icon name='warning sign' className='icon color' />
        case 1:
          return <Icon name='check' color='green'/>
        default:
          return value
      }
    }
    return value;
  }
  const statusResult = (value) => {
   
      switch (value) {
        case 0:
          return <Label color='red' size='mini'>Отклонение</Label>
        case 1:
          return <Label color='green' size='mini'>Норма</Label>
        default:
          return value
      }
  }

  const buildCell = (field, row) => {
    const finded = tableHeader.find((item) => item.name === field);
    if (!finded) {
      return null;
    }
    if (finded?.editable) {
      return (
        <>
          <Table.Cell 
            key={`${row}${field}`}
            error={limit && row[field] < limit}
            onClick={() => handleCellClick(row.id, field)}
          >
            {editingCell &&
            editingCell.rowId === row.id &&
            editingCell.field === field ? (
              <Input
                value={row[field] || ''}
                onChange={(event) => handleCellChange(event, row.id, field)}
                onBlur={() => handleCellBlur(row, field)}
              />
            ) : (
              <span>
                {row[field] || '-//-'}
              </span>
            )}
          </Table.Cell>
        </>
      );
    }
    return (
      <>
        <Table.Cell key={`${row}${field}`}>{spanBuild(field, row[field])}</Table.Cell>
      </>
    );
  }

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            {tableHeader.map(({ id, name, title, width }) => (
              <Table.HeaderCell key={`${id}${name}`} width={width}>
                {title}
              </Table.HeaderCell>
            ))}
            {actionCell && <Table.HeaderCell width={1}></Table.HeaderCell>}
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((row) => (
            <Table.Row key={row.id}>
              {Object.keys(row).map((field) => buildCell(field, row))}
              {actionCell && (
                <Table.Cell>
                  <Button
                    className='ui button_yellow'
                    size="mini"
                    onClick={() => updateTableData(tableData, row, 0)}
                    floated='right'
                  >
                    Не соотв.
                  </Button>
                  <Button
                    className='ui button_green'
                    size="mini"
                    onClick={() => updateTableData(tableData, row, 1)}
                    floated='right'
                  >
                    Соотв.
                  </Button>
                  
                </Table.Cell>
              )}
              <Table.Cell>{statusResult(row?.check_result)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button
        onClick={() => submit(changedRow)}
        style={{ margin: "20px 0" }}
        color="blue"
      >
        Сохранить
      </Button>
    </>
  );
};

export default EditableTable;