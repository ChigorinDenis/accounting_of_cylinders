import React, { useState, useEffect } from 'react';
import { Table, Input } from 'semantic-ui-react';

const EditableTable = ({ tableHeader, data }) => {
  const [editingCell, setEditingCell] = useState(null); // Хранение информации о редактируемой ячейке
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

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

  const buildCell = (field, row) => {
    const finded = tableHeader.find((item) => item.name === field);
    if (!finded) {
      return null;
    }
    if (finded?.editable) {
      return (
        <Table.Cell key={`${row}${field}`}  onClick={() => handleCellClick(row.id, field)}>
          {editingCell &&
          editingCell.rowId === row.id &&
          editingCell.field === field ? (
            <Input
              value={row[field]}
              onChange={(event) => handleCellChange(event, row.id, field)}
              onBlur={handleCellBlur}
              style={{ margin: "0px" }}
            />
          ) : (
            <span>
              {row[field]}
            </span>
          )}
        </Table.Cell>
      );
    }
    return (
      <Table.Cell key={`${row}${field}`}>{row[field]}</Table.Cell>
    );
  }

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {tableHeader.map(({ id, name, title, width }) => (
            <Table.HeaderCell key={`${id}${name}`} width={width}>{title}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.map((row) => (
          <Table.Row key={row.id}>
            {Object.keys(row).map((field) => buildCell(field, row))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EditableTable;