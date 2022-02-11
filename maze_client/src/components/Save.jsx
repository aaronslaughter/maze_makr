import React, { useState } from 'react'
import { Button, Modal, Input } from 'react-rainbow-components'

const Save = () => {

  const containerStyles = {
    maxWidth: 300,
  }

  const [isOpen, toggleOpen] = useState(false)
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Axios POST
    toggleOpen(false)
  }

  return (
    <div>
      <Button variant='success' label='Save' onClick={() => toggleOpen(true)}></Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleOpen(false)}
        title="Save">
        <Input
          id="input-component-1"
          label="Enter a name for this maze."
          placeholder="my favorite maze"
          style={containerStyles}
          value={name}
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          onChange={handleChange}/>
        <Button variant='success' disabled={!name} label='Save' onClick={handleSubmit}></Button>
      </Modal>
    </div>
  )
}

export default Save