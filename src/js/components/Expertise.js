import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Table, Label} from "semantic-ui-react";
import { format, differenceInDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveExpertise,
  setIsOpen,
  setControlsData,
  setStatusExpertise,
} from "../state/expertiseReducer";
import { setIsOpenNewExpertise } from "../state/modalReducer";
import Modal from "./Modal";
import ExpertiseCreate from "./ExpertiseCreate";

const spanStyle = {
  color: "red",
};

const statusTag = (status) => {
  switch (status) {
    case 'finished':
      return <Label basic color='green' size='mini'>Завершено</Label>
    default:
      return <Label basic color='grey' size='mini'>Выполняется</Label>
  }
}
export default () => {
  const [expertise, setExpertise] = useState([]);
  const activeExpertise = useSelector((state) => state.expertise);
  const isOpenNewExpertise = useSelector(
    (state) => state.modal.isOpenNewExpertise
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await electron.ipcRenderer.invoke("get-expertise");
      const sortedExpertise = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      setExpertise(sortedExpertise);
      return () => {
        ipcRenderer.removeAllListeners("get-expertise");
      };
    }
    fetchData();
  }, [isOpenNewExpertise]);

  const handleClose = () => {
    dispatch(setIsOpenNewExpertise(false));
  };

  const openExpertiseModal = async (id) => {
    const [visualControl] = await electron.ipcRenderer.invoke(
      "get-visual-control-by-id",
      id
    );
    const [ultrasonicControl] = await electron.ipcRenderer.invoke(
      "get-ultrasonic-control-by-id",
      id
    );
    const [solidControl] = await electron.ipcRenderer.invoke(
      "get-solid-control-by-id",
      id
    );
    const [pneumaticControl] = await electron.ipcRenderer.invoke(
      "get-pneumatic-control-by-id",
      id
    );

    visualControl.date = visualControl.date && visualControl.date.toISOString();
    ultrasonicControl.date =
      ultrasonicControl.date && ultrasonicControl.date.toISOString();
    solidControl.date = solidControl.date && solidControl.date.toISOString();
    pneumaticControl.date =
      pneumaticControl.date && pneumaticControl.date.toISOString();

    dispatch(
      setControlsData({
        visualControl,
        ultrasonicControl,
        solidControl,
        pneumaticControl,
      })
    );
    dispatch(setActiveExpertise(id));
    dispatch(setIsOpen(true));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "middle",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        <Header  as="h3">
          Экспертиза
        </Header>
        <Button
          floated="right"
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={() => {
            dispatch(setIsOpenNewExpertise(true));
          }}
        >
          <Icon name="plus" />
          Новая экспертиза
        </Button>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Номер</Table.HeaderCell>
            <Table.HeaderCell>Дата проведения</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expertise.map((item) => {
            const { id, number, date, status} = item;
            const date_exp = new Date(date);
            return (
              <Table.Row key={`${id}${number}`}>
                <Table.Cell>{number}</Table.Cell>
                <Table.Cell>{format(date_exp, "dd.MM.yyyy")}</Table.Cell>
                <Table.Cell>{statusTag(status)}</Table.Cell>
                <Table.Cell>
                  {status === "finished" && <Button
                    animated="vertical"
                    floated="right"
                    onClick={() => {
                      electron.ipcRenderer.invoke("get-expertise-all-info", id);
                    }}
                  >
                    <Button.Content hidden>Скачать</Button.Content>
                    <Button.Content visible>
                      <Icon name="download" />
                    </Button.Content>
                  </Button>}
                  {status === "finished"? (
                  <Button
                    basic
                    color="blue"
                    floated="right"
                    onClick={() => {
                      dispatch(setStatusExpertise('finished'));
                      openExpertiseModal(id);
                    }}
                  >
                    Результаты
                  </Button>) : (
                    <Button
                      floated="right"
                      onClick={() => {
                        dispatch(setStatusExpertise('in_progress'));
                        openExpertiseModal(id);
                      }}
                    >
                      Контроль
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4"></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Modal open={isOpenNewExpertise} close={setIsOpenNewExpertise}>
        <ExpertiseCreate close={handleClose} />
      </Modal>
    </>
  );
};
