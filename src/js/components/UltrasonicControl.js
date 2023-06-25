import React, {useState, useEffect} from "react";
import EditableTable from "./EditableTable";
import UpdateControl from "./UpdateControl";
import { Button, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import ResultControlInfo from "./ResultContolInfo";
import checkFilling from "../../utils/checkFilling";
import MessageText from "./MessageText";

const tableHeader = [
  { id: 1, title: 'Заводской номер', name: 'prod_number', width: 1, editable: false },
  { id: 2, title: 'Год выпуска', name: 'prod_date', width: 1, editable: false },
  { id: 3, title: 'Схема 1', name: 'point_1', width: 1, editable: true, type: 'input' },
  { id: 4, title: 'Схема 2', name: 'point_2', width: 1, editable: true, type: 'input' },
  { id: 5, title: 'Схема 3', name: 'point_3', width: 1, editable: true, type: 'input' },
  { id: 6, title: 'Схема 4', name: 'point_4', width: 1, editable: true, type: 'input' },
  { id: 7, title: 'Схема 5', name: 'point_5', width: 1, editable: true, type: 'input' },
  { id: 8, title: 'Схема 6', name: 'point_6', width: 1, editable: true, type: 'input' },
  { id: 9, title: 'Схема 7', name: 'point_7', width: 1, editable: true, type: 'input' },
  { id: 10, title: 'Схема 8', name: 'point_8', width: 1, editable: true, type: 'input' },
  { id: 11, title: 'Схема 9', name: 'point_9', width: 1, editable: true, type: 'input' },
];


function UltrasonicExpertise({next}) {
  const [results, setResults] = useState([]);
  const [ultrasonicControlData, setUltrasonicControlData] = useState({ controlEquipment: [], controlEmployees: []});
  const [isUpdate, setIsUpdate] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [isFill, setIsFill] = useState(null)

  const controlData = useSelector((state) => (state.expertise.controlsData.ultrasonicControl));
  const idExpertiseActive = useSelector((state) => (state.expertise.activeExpertise));
  const limit = 24;

  const submitUpdate = (formData) => {
    const mappedData = formData.map((record) => {
      let check_result = 1;
      for (const key in record) {
        if (key.includes('point') && record[key] < limit) {
          check_result = 0;
          break;
        }
      }
      return {
        ...record,
        check_result
      }
    })
    electron.ipcRenderer.send('update-ultrasonic-result', mappedData);
    setIsSended(!isSended);
  }

  const checkFillingAllData = () => {
    const fields = ['point_1', 'point_2', 'point_3', 'point_4', 'point_5', 'point_6', 'point_7', 'point_8', 'point_9']
    const isFillData = checkFilling(results, fields);
    if (isFillData) {
      electron.ipcRenderer.send('update-ultrasonic-status', controlData.id);
      next('solid')
    }
    else {
      setIsFill(true);
      setTimeout(() => {
        setIsFill(false);
      }, 7000);
    }
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await electron.ipcRenderer.invoke('get-ultrasonic-control-result', idExpertiseActive);   
      const controlEquipment = await electron.ipcRenderer.invoke('get-ultrasonic-control-equipments', idExpertiseActive);
      const controlEmployees = await electron.ipcRenderer.invoke('get-ultrasonic-control-employees', idExpertiseActive);

      setUltrasonicControlData({
        controlEmployees,
        controlEquipment
      });

      const mappedData = data.map((item) => ({
        ...item,
        point_1: item.point_1 && item.point_1.toFixed(1),
        point_2: item.point_2 && item.point_2.toFixed(1),
        point_3: item.point_3 && item.point_3.toFixed(1),
        point_4: item.point_4 && item.point_4.toFixed(1),
        point_5: item.point_5 && item.point_5.toFixed(1),
        point_6: item.point_6 && item.point_6.toFixed(1),
        point_7: item.point_7 && item.point_7.toFixed(1),
        point_8: item.point_8 && item.point_8.toFixed(1),
        point_9: item.point_9 && item.point_9.toFixed(1)
      }))
      setResults(mappedData);
      return () => {
        ipcRenderer.removeAllListeners('get-ultrasonic-control-result');
      };
    }
    fetchData(); 
  }, [isUpdate, isSended]);
  return (
    <>
    <Header as="h3" color="blue">Ультразвуковая толщинаметрия</Header>
    <ResultControlInfo controlName={'ultrasonic'} results={results} visible={controlData.result === 'finished'}/>
    <UpdateControl routeName={'ultrasonic-control'} ptd={true} ntd={true} data={{...ultrasonicControlData, controlData}} setIsUpdate={setIsUpdate}/>
    <Header as="h4" color="blue">Сосуды</Header>
    <EditableTable tableHeader={tableHeader} data={results}  submit={submitUpdate} limit={limit}/>
    <Button onClick={checkFillingAllData} floated="right" style={{margin: '20px 0'}}>Далee</Button>
    <MessageText show={isFill}/>
    </>
  )
}

export default UltrasonicExpertise;