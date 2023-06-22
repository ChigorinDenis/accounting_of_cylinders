import React, { useState, useEffect } from "react";
import { Icon, Popup, List, Button, Image, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { addMonths, format } from "date-fns";

const ListExampleFloated = ({ data }) => {
  const today = new Date();
  const futureDate = addMonths(today, 3);
  return (
    <List divided verticalAlign="middle">
      {data.length > 0 ? data.map((item) => (
        <List.Item key={`${item.id}${item.prod_number}`}>
          <List.Icon name="envelope outline" />
          <List.Content>
            <List.Header as="a">Баллон зав № {item.prod_number}</List.Header>
            <List.Description>
              Требуется провести внеплановую экспертизу{" "}
              <strong>{format(futureDate, "dd.MM.yyyy")}</strong>
            </List.Description>
          </List.Content>
        </List.Item>
      )) : <List.Item>
        <List.Content>
          Отсутствуют записи
        </List.Content>
        </List.Item>}
    </List>
  );
};

const NotificationComponent = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
 

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      {/* <Icon name="bell" onClick={handleIconClick} /> */}

      <Popup
        // open={isOpen}
        // onClose={() => setIsOpen(false)}
        on="click"
        trigger={
          <div>
            <Icon name="bell" />
            {data.length > 0 && <Label circular color='red'>{data.length}</Label>}
          </div>
        }
        position="bottom center"
        style={{
          width: '20%',
          minWidth: '400px',
        }}
      >
        <Popup.Content>
          {<ListExampleFloated data={data} />}
        </Popup.Content>
      </Popup>
    </div>
  );
};

export default NotificationComponent;