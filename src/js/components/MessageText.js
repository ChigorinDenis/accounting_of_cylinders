import React from "react";
import { Message} from "semantic-ui-react";

const MessageText = ({show}) => (
  show && <Message error>
    <Message.Header>Неполные данные</Message.Header>
    <p>
      Заполните все поля, чтобы перейти к следующему шагу.
    </p>
  </Message>
);

export default MessageText;