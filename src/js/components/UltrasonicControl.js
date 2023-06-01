import React, {useState, useEffect} from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: 'Схема 1', name: 'point_1', width: 1, editable: true },
  { id: 4, title: 'Схема 2', name: 'point_2', width: 1, editable: true },
  { id: 5, title: 'Схема 3', name: 'point_3', width: 1, editable: true },
  { id: 6, title: 'Схема 4', name: 'point_4', width: 1, editable: true },
  { id: 7, title: 'Схема 5', name: 'point_5', width: 1, editable: true },
  { id: 8, title: 'Схема 6', name: 'point_6', width: 1, editable: true },
  { id: 9, title: 'Схема 7', name: 'point_7', width: 1, editable: true },
  { id: 10, title: 'Схема 8', name: 'point_8', width: 1, editable: true },
  { id: 11, title: 'Схема 9', name: 'point_9', width: 1, editable: true },
];


function UltrasonicExpertise({next}) {
  const [results, setResults] = useState([]);

  const submitUpdate = (formData) => {
    electron.ipcRenderer.send('update-ultrasonic-result', formData);
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-ultrasonic-control-result', 29);
      console.log(data)
      setResults(data);
      return () => {
        ipcRenderer.removeAllListeners('get-ultrasonic-control-result');
      };
    }
    fetchData(); 
  }, []);
  return (
    <>
    <Header as="h3" color="blue">Ультразвуковая толщинаметрия</Header>
    <UpdateControl />
    <EditableTable tableHeader={tableHeader} data={results} submit={submitUpdate}/>
    <Button onClick={() => next('solid')}>Дальше</Button>
    </>
  )
}

export default UltrasonicExpertise;