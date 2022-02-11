import React, {useState} from 'react'
import styled from 'styled-components'
import { Button, Modal, Input } from 'react-rainbow-components'

const Login = (props) => {

  const containerStyles = {
    maxWidth: 300,
  }

  const buttonStyles = {
    maxWidth: 150,
  }

  const [isOpen, toggleOpen] = useState(false)
  const [username, setUsername] = useState('')

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.loginUser(username)
    toggleOpen(false)
  }

  return (
    <div>
      <Button variant='brand' onClick={() => toggleOpen(true)}>Login</Button>
      <Modal id="modal-2" isOpen={isOpen} onRequestClose={() => toggleOpen(!isOpen)}>
        <FlexButtonContainer>
          <Input
            id="input-component-1"
            label="Enter a username"
            placeholder="Username"
            style={containerStyles}
            value={username}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            onChange={handleChange}/>
          <Button variant='success' style={buttonStyles} disabled={!username} onClick={handleSubmit}>Submit</Button>
        </FlexButtonContainer>
      </Modal>
    </div>
  )
}

export default Login

const FlexButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`