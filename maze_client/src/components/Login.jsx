import React, {useState} from 'react'
import { Button, Modal, Input } from 'react-rainbow-components'

const Login = (props) => {

  const containerStyles = {
    maxWidth: 300,
  }

  const [isOpen, toggleOpen] = useState(false)
  const [username, setUsername] = useState('')

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.loginUser(username)
  }

  return (
    <div>
      <Button onClick={() => toggleOpen(true)}>Login
        <Modal id="modal-1" isOpen={isOpen} onRequestClose={() => toggleOpen(!isOpen)}>
          <Input
            id="input-component-1"
            label="Enter a username"
            placeholder="Username"
            style={containerStyles}
            valeu={username}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            onChange={handleChange}/>
          <Button disabled={!username} onClick={handleSubmit}>Submit</Button>
        </Modal>
      </Button>
    </div>
  )
}

export default Login