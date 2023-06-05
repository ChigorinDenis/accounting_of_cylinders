import React, {useState, useEffect} from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";

const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: '100 (0,25Рраб)', name: 'load_100', width: 1, editable: true },
  { id: 4, title: '200 (0,5Рраб)', name: 'load_200', width: 1, editable: true },
  { id: 5, title: '300,5 (0,75Рраб)', name: 'load_300', width: 1, editable: true },
  { id: 6, title: '400 (Рраб)', name: 'load_400', width: 1, editable: true },
  { id: 7, title: '420 (Рисп)', name: 'load_420', width: 1, editable: true },
];


function PnematicControl({next}) {
  const [results, setResults] = useState([]);
  const [pneumaticControlData, setPneumaticControlData] = useState({ controlEquipment: [], controlEmployees: []});
  const [isUpdate, setIsUpdate] = useState(null);

  const controlData = useSelector((state) => (state.expertise.controlsData.pneumaticControl));
  const idExpertiseActive = useSelector((state) => (state.expertise.activeExpertise));

  const submitUpdate = (formData) => {
    electron.ipcRenderer.send('update-pneumatic-result', formData);
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-pneumatic-control-result', idExpertiseActive);  
      const controlEquipment = await electron.ipcRenderer.invoke('get-pneumatic-control-equipments', idExpertiseActive);
      const controlEmployees = await electron.ipcRenderer.invoke('get-pneumatic-control-employees', idExpertiseActive);
      console.log('Pnematic', controlEquipment, controlEmployees)
      setPneumaticControlData({
        controlData,
        controlEmployees,
        controlEquipment
      });
      
      setResults(data);
      return () => {
        ipcRenderer.removeAllListeners('get-pneumatic-control-result');
      };
    }
    fetchData(); 
  }, [isUpdate]);
  return (
    <>
    <Header as="h3" color="blue">Пневматические испытания</Header>
    <UpdateControl routeName={'pneumatic-control'} quality_doc={true} volme={false} data={{...pneumaticControlData, controlData}} setIsUpdate={setIsUpdate}/>
    <Header as="h4" color="blue">Сосуды</Header>
    <EditableTable tableHeader={tableHeader} data={results} submit={submitUpdate}/>
    <Button onClick={() => next('pneumatic')} floated="right" style={{margin: '20px 0'}}>Завершить</Button>
    </>
  )
}

export default PnematicControl;