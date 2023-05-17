import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

export default ({children}) => {
  
  return (
    <Modal
      trigger={<Button>Show Modal</Button>}
      header='Reminder!'
      actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    >
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  )
}

