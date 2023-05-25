import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

export default ({children}) => {
  
  return (
    <Modal
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

