import React, {useState, useEffect} from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import ResultControlInfo from "./ResultContolInfo";

const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: '100 (0,25Рраб)', name: 'load_100', width: 1, editable: true },
  { id: 4, title: '200 (0,5Рраб)', name: 'load_200', width: 1, editable: true },
  { id: 5, title: '300,5 (0,75Рраб)', name: 'load_300', width: 1, editable: true },
  { id: 6, title: '400 (Рраб)', name: 'load_400', width: 1, editable: true },
  { id: 7, title: '420 (Рисп)', name: 'load_420', width: 1, editable: true },
];

const changeStatus = (status) => {
  switch (status) {
    case 'active': return 'Активный';
    case 'passive': return 'Неактивный';
    case 'critical': return 'Критический';
    case 'extra': return 'Катастрофический'
    default: return '';
  }
}

const returnStatus = (status) => {
  switch (status) {
    case 'Активный': return 'active';
    case 'Неактивный': return 'passive';
    case 'Критический': return 'critical';
    case 'Катастрофический': return 'extra'
    default: return '';
  }
}
const checkLimit = (field, row) => {
  const value = row[field];
  if (field === 'load_100' || field === 'load_200' || field === 'load_300') {
    if (value === 'Катастрофический' || value === 'Критический' ||  value === 'Активный') {
      return true;
    }
    return false;
  }
  if (field === 'load_400' || field === 'load_420') {
    if (value === 'Катастрофический' || value === 'Критический') {
      return true;
    }
    return false;
  }
}
function PnematicControl({next}) {
  const [results, setResults] = useState([]);
  const [pneumaticControlData, setPneumaticControlData] = useState({ controlEquipment: [], controlEmployees: []});
  const [isUpdate, setIsUpdate] = useState(null);
  const [isSended, setIsSended] = useState(false);

  const controlData = useSelector((state) => (state.expertise.controlsData.pneumaticControl));
  const idExpertiseActive = useSelector((state) => (state.expertise.activeExpertise));

  const submitUpdate = (formData) => {
    const mappedData = formData.map((record) => {
      let check_result = 1;
      for (const key in record) {
        
        if (key.includes('load')) {
          
          if (checkLimit(key, record)) {
            check_result = 0;
          }
          record[key] = returnStatus(record[key]);
        }
      }
      return {
        ...record,
        check_result
      }
    })
    // console.log('submitUpdate', mappedData);
    electron.ipcRenderer.send('update-pneumatic-result', mappedData);
    setIsSended(!isSended);
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-pneumatic-control-result', idExpertiseActive);  
      const controlEquipment = await electron.ipcRenderer.invoke('get-pneumatic-control-equipments', idExpertiseActive);
      const controlEmployees = await electron.ipcRenderer.invoke('get-pneumatic-control-employees', idExpertiseActive);
      const mappedData = data.map((item) => {
        const { load_100, load_200, load_300, load_400, load_420 } = item;
        return {
          ...item,
          'load_100': changeStatus(load_100),
          'load_200': changeStatus(load_200),
          'load_300': changeStatus(load_300),
          'load_400': changeStatus(load_400),
          'load_420': changeStatus(load_420),
        }
      })
      setPneumaticControlData({
        controlData,
        controlEmployees,
        controlEquipment
      });
      
      setResults(mappedData);
      return () => {
        ipcRenderer.removeAllListeners('get-pneumatic-control-result');
      };
    }
    fetchData(); 
  }, [isUpdate, isSended]);
  return (
    <>
    <Header as="h3" color="blue">Пневматические испытания</Header>
    <ResultControlInfo controlName='pneumatic' results={results} visible={controlData.result === 'finished'}/>
    <UpdateControl routeName={'pneumatic-control'} quality_doc={true} volme={false} data={{...pneumaticControlData, controlData}} setIsUpdate={setIsUpdate}/>
    <Header as="h4" color="blue">Сосуды</Header>
    <EditableTable tableHeader={tableHeader} data={results} submit={submitUpdate} checkLimit={checkLimit}/>
    <Button onClick={() => next('pneumatic')} floated="right" style={{margin: '20px 0'}}>Завершить</Button>
    </>
  )
}

export default PnematicControl;