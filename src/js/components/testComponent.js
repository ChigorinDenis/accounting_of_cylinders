import React, { useState } from 'react';
import { Table, Input } from 'semantic-ui-react';

const EditableTable = () => {
  const [editingCell, setEditingCell] = useState(null); // Хранение информации о редактируемой ячейке
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    // ...другие данные таблицы
  ]);

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

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>ID</Table.HeaderCell>
          <Table.HeaderCell width={5}>Name</Table.HeaderCell>
          <Table.HeaderCell width={3}>Age</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.id}</Table.Cell>
            <Table.Cell>
              {editingCell && editingCell.rowId === row.id && editingCell.field === 'name' ? (
                <Input
                  value={row.name}
                  onChange={(event) => handleCellChange(event, row.id, 'name')}
                  onBlur={handleCellBlur}
                  style={{margin: '0px'}}
                />
              ) : (
                <span onClick={() => handleCellClick(row.id, 'name')}>{row.name}</span>
              )}
            </Table.Cell>
            <Table.Cell>
              {editingCell && editingCell.rowId === row.id && editingCell.field === 'age' ? (
                <Input
                  value={row.age}
                  onChange={(event) => handleCellChange(event, row.id, 'age')}
                  onBlur={handleCellBlur}
                />
              ) : (
                <span onClick={() => handleCellClick(row.id, 'age')}>{row.age}</span>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EditableTable;