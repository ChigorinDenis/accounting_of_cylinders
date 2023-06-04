import React, { useState, useEffect } from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
import { groupByTwoField } from "../../utils/performData";
import { useSelector } from "react-redux";

const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: 'Чек', name: 'check', width: 1, editable: false },
  { id: 4, title: 'Описание', name: 'description', width: 2, editable: true }
];



function VisualControl({next}) {
  const [results, setResults] = useState([]);
  const [visualControlData, setVisualControlData] = useState({ controlEquipment: [], controlEmployees: []});
  const controlData = useSelector((state) => (state.expertise.controlsData.visualControl));

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-visual-control-result', 29);
      const controlEquipment = await electron.ipcRenderer.invoke('get-visual-control-equipments', 29);
      const controlEmployees = await electron.ipcRenderer.invoke('get-visual-control-employees', 29);

      setVisualControlData({
        controlData,
        controlEmployees,
        controlEquipment
      });

      setResults(data);

      return () => {
        ipcRenderer.removeAllListeners('get-visual-control-result');
        ipcRenderer.removeAllListeners('get-visual-control-by-id');
        ipcRenderer.removeAllListeners('get-visual-control-equipments');
        ipcRenderer.removeAllListeners('get-visual-control-employees');
      };
    }
    fetchData(); 
  }, []);
  
  return (
    <>
    <Header as="h3" color="blue">Визуально-измерительный контроль</Header>
    <UpdateControl routeName={'visual-control'} ptd={false} data={{...visualControlData, controlData}} />
    <EditableTable tableHeader={tableHeader} data={results} />
    <Button onClick={() => next('ultrasonic')} floated="right">Далee</Button>
    </>
  )
}

export default VisualControl;