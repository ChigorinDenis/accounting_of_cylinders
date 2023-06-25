import React, { useState, useEffect } from 'react';
import { useSelector } from'react-redux';
import { Table, Input, Button, Icon, Label} from 'semantic-ui-react';

const EditableTable = ({ tableHeader, data, submit, actionCell, limit, checkLimit}) => {
  const [editingCell, setEditingCell] = useState(null); // Хранение информации о редактируемой ячейке
  const [tableData, setTableData] = useState([]);
  const [changedRow, setChangedRow] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const statusExpertise = useSelector(state => state.expertise.statusExpertise);

  useEffect(() => {
    setTableData(data);
  }, [data, actionCell]);

  const handleCellClick = (rowId, field) => {
    const row = tableData.find((row) => row.id === rowId);
    const currentValue = row ? row[field] : '';
    setEditingCell({ rowId, field, currentValue });
  };

  const handleCellChange = (event, rowId, field) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
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
    setEditingCell('');
    const changedRowIndex = changedRow.findIndex((item) => item.id === row.id);
    if (changedRowIndex !== -1) {
      const updatedChangedRow = [...changedRow];
      updatedChangedRow[changedRowIndex][field] = row[field];
      setChangedRow(updatedChangedRow);
    } else {
      const newChangedRow = { ...row, [field]: row[field] };
      setChangedRow([...changedRow, newChangedRow]);
    }
    setSelectedValue(''); // Сбросить выбранное значение после сохранения
  };

  const updateTableData = (tableData, row, value) => {
    const updatedTableData = tableData.map((rowData) => {
      if (rowData.id === row.id) {
        return { ...rowData, check_result: value };
      }
      return rowData;
    });
  
    const updatedChangedRow = [...changedRow];
    const changedRowIndex = updatedChangedRow.findIndex((item) => item.id === row.id);
    if (changedRowIndex !== -1) {
      updatedChangedRow[changedRowIndex].check_result = value;
    } else {
      const newChangedRow = { ...row, check_result: value };
      updatedChangedRow.push(newChangedRow);
    }
    setTableData(updatedTableData);
    setChangedRow(updatedChangedRow);
    setSelectedValue(''); // Сбросить выбранное значение после сохранения
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
    const isLimit = limit ? row[field] < limit : checkLimit(field, row)
    if (!finded) {
      return null;
    }
    if (finded?.editable) {
      if (finded.type === "select") {
        return (
          <Table.Cell 
            key={`${row}${field}`}
            error={isLimit}
            onClick={() => handleCellClick(row.id, field)}
          >
            {editingCell && editingCell.rowId === row.id && editingCell.field === field ? (
              <select
                value={selectedValue}
                onChange={(event) => handleCellChange(event, row.id, field)}
                onBlur={() => handleCellBlur(row, field)}
              >
                {finded.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <span>{row[field] || "-//-"}</span>
            )}
          </Table.Cell>
        );
      } else {
        return (
          <Table.Cell
            key={`${row}${field}`}
            error={isLimit}
            onClick={() => handleCellClick(row.id, field)}
          >
            {editingCell && editingCell.rowId === row.id && editingCell.field === field ? (
              <Input
                value={row[field] || ""}
                onChange={(event) => handleCellChange(event, row.id, field)}
                onBlur={() => handleCellBlur(row, field)}
              />
            ) : (
              <span>{row[field] || "-//-"}</span>
            )}
          </Table.Cell>
        );
      }
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
            <Table.HeaderCell width={1}>Результат</Table.HeaderCell>
            {actionCell && <Table.HeaderCell width={1}></Table.HeaderCell>}
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((row) => (
            <Table.Row key={row.id}>
              {Object.keys(row).map((field) => buildCell(field, row))}
              <Table.Cell>{statusResult(row?.check_result)}</Table.Cell>
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
              
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      { statusExpertise === "in_progress" &&
      <Button
        onClick={() => submit(tableData)}
        style={{ margin: "20px 0" }}
        color="blue"
      >
        Сохранить
      </Button> }
    </>
  );
};

export default EditableTable;