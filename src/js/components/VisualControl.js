import React, { useState, useEffect } from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";


const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: 'Чек', name: 'check', width: 1, editable: false },
  { id: 4, title: 'Описание', name: 'description', width: 2, editable: true }
];



function VisualControl({next}) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-visual-control-result', 29);
      setResults(data);
      return () => {
        ipcRenderer.removeAllListeners('get-visual-control-result');
      };
    }
    fetchData(); 
  }, []);
  
  return (
    <>
    <Header as="h3" color="blue">Визуально-измерительный контроль</Header>
    <UpdateControl routeName={'visual-control'}/>
    <EditableTable tableHeader={tableHeader} data={results} />
    <Button onClick={() => next('ultrasonic')}>Дальше</Button>
    </>
  )
}

export default VisualControl;