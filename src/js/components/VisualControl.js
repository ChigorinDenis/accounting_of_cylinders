import React, { useState, useEffect } from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
import { groupByTwoField } from "../../utils/performData";
import { useSelector } from "react-redux";
import ResultControlInfo from "./ResultContolInfo";
const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: 'Визуальное состояние', name: 'check_result', width: 1, editable: false },
  // { id: 4, title: 'Описание', name: 'description', width: 1, editable: true }
];



function VisualControl({next}) {
  const [results, setResults] = useState([]);
  const [visualControlData, setVisualControlData] = useState({ controlEquipment: [], controlEmployees: []});
  const [isUpdate, setIsUpdate] = useState(null);

  const controlData = useSelector((state) => (state.expertise.controlsData.visualControl));
  const idExpertiseActive = useSelector((state) => (state.expertise.activeExpertise));

  const submitUpdate = (formData) => {
    electron.ipcRenderer.send('update-visual-result', formData);
  }
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-visual-control-result', idExpertiseActive);
      const controlEquipment = await electron.ipcRenderer.invoke('get-visual-control-equipments', idExpertiseActive);
      const controlEmployees = await electron.ipcRenderer.invoke('get-visual-control-employees', idExpertiseActive);

      setVisualControlData({
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
  }, [isUpdate]);
  
  return (
    <>
    <Header as="h3" color="blue">Визуально-измерительный контроль</Header>
    <ResultControlInfo controlName='visual' results={results} visible={controlData.result === 'finished'}/>
    <UpdateControl routeName={'visual-control'} ntd={true} data={{...visualControlData, controlData}} setIsUpdate={setIsUpdate} />
    <Header as="h4" color="blue">Сосуды</Header>
    <EditableTable tableHeader={tableHeader} data={results} actionCell={true} submit={submitUpdate} />
    <Button onClick={() => next('ultrasonic')} floated="right" style={{margin: '20px 0'}}>Далee</Button>
    </>
  )
}

export default VisualControl;