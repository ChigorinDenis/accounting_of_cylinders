import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Table } from "semantic-ui-react";
import { format, differenceInDays} from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { setActiveExpertise, setIsOpen, setControlsData } from "../state/expertiseReducer";
import { setIsOpenNewExpertise } from "../state/modalReducer";
import Modal from "./Modal";
import ExpertiseCreate from './ExpertiseCreate'

const spanStyle = {
  color: 'red'
}
export default () => {
  const [expertise, setExpertise] = useState([]);
  const activeExpertise = useSelector((state) => state.expertise);
  const modal = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await electron.ipcRenderer.invoke("get-expertise");
      setExpertise(data);
      return () => {
        ipcRenderer.removeAllListeners("get-expertise");
      };
    }
    fetchData();
  }, []);

  
  // const getAllControlData = (id) => {
  //   const getControlData = async (routeName) => {
  //     const [control] = await electron.ipcRenderer.invoke(`get-${routeName}-by-id`, id);
  //     control.date = control.date && control.date.toISOString();
  //     const controlResult = await electron.ipcRenderer.invoke(`get-${routeName}-result`, id);
  //     const controlEquipment = await electron.ipcRenderer.invoke(`get-${routeName}-equipments`, id);
  //     const controlEmployees = await electron.ipcRenderer.invoke(`get-${routeName}-employees`, id);
  //     return {
  //       control,
  //       controlResult,
  //       controlEquipment,
  //       controlEmployees
  //     }
  //   }
  //   const routes = ['visual-control', 'ultrasonic-control', 'solid-control', 'pneumatic-control'];
  //   const [visualControl, ultrasonicControl, solidControl, pneumaticControl] =  routes.map(getControlData);
  //   const mapRoutes = {
  //     'visual-control': 'visualControl',
  //     'ultrasonic-control': 'ultrasonicControl',
  //     'solid-control': 'solidControl',
  //     'pneumatic-control': 'pneumaticControl'
  //   }

  //   const result = {};

  //   Promise.all(routes)
  //     .then((route) => {
  //       const controlName = mapRoutes[route];
  //       const data = getControlData(route);
  //       result[controlName] = data;
  //     })

  //   dispatch(setControlsData(result));
  //   // dispatch(setIsOpen(true));
  // }

  const openExpertiseModal = async (id) =>{
    const [visualControl] = await electron.ipcRenderer.invoke('get-visual-control-by-id', id);
    const [ultrasonicControl] = await electron.ipcRenderer.invoke('get-ultrasonic-control-by-id', id);
    const [solidControl] = await electron.ipcRenderer.invoke('get-solid-control-by-id', id);
    const [pneumaticControl] = await electron.ipcRenderer.invoke('get-pneumatic-control-by-id', id);

    visualControl.date = visualControl.date && visualControl.date.toISOString();
    ultrasonicControl.date = ultrasonicControl.date && ultrasonicControl.date.toISOString();
    solidControl.date = solidControl.date && solidControl.date.toISOString();
    pneumaticControl.date = pneumaticControl.date && pneumaticControl.date.toISOString();

    dispatch(setControlsData({
      visualControl,
      ultrasonicControl,
      solidControl,
      pneumaticControl
    }))
    dispatch(setActiveExpertise(id))
    dispatch(setIsOpen(true));
  }

  return (
    <>
      <Header style={{marginTop: '30px', marginBottom: '20px'}} as='h3'>Экспертиза</Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер</Table.HeaderCell>
            <Table.HeaderCell>Дата проведения</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expertise.map((item) => {
            const { id, number, date} = item;
            const date_exp = new Date(date);
            return (
              <Table.Row key={`${id}${number}`}>
                <Table.Cell>{number}</Table.Cell>
                <Table.Cell>{format(date_exp, 'dd.MM.yyyy')}</Table.Cell>
                <Table.Cell>
                  <Button
                    basic color="blue"
                    floated="right"
                    onClick={() => {openExpertiseModal(id)}}
                  >
                    Результаты
                  </Button>
                </Table.Cell>
                
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => {
                  dispatch(setIsOpenNewExpertise(true))
                }}
              >
                <Icon name="plus" />
                Новая экспертиза
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Modal open={modal.isOpenNewExpertise} close={setIsOpenNewExpertise}>
        <ExpertiseCreate />
      </Modal>
    </>
  );
};
