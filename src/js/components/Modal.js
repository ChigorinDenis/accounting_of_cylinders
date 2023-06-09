import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../state/expertiseReducer';

export default ({ open, close, children}) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(close(false));
  }

  return (
    <Modal
      size='large'
      trigger={null}
      open={open}
      onClose={closeModal}
    >
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

