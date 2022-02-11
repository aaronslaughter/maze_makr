import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, Input } from 'react-rainbow-components'
import { BASE_URL } from '../globals'

const Save = ({user, maze}) => {

  const containerStyles = {
    maxWidth: 300,
  }

  const buttonStyles = {
    maxWidth: 150,
  }

  const [isOpen, toggleOpen] = useState(false)
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleOpen(false)
    const saveMaze = async () => {

      const straightMaze = []
      for (let row = 0; row < maze.grid.length; row++) {
        for (let col = 0; col < maze.grid[row].length; col++) {
          straightMaze.push(maze.grid[row][col])
        }
      }

      const data = {
        name: name, 
        height: maze.height, 
        width: maze.width,
        maze: straightMaze,
        user_id: user.id
      }

      await axios.post(`${BASE_URL}/mazes/`, data)
    }
    saveMaze()
    setName('')
  }

  return (
    <div>
      <Button variant='success' label='Save' onClick={() => toggleOpen(true)}></Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleOpen(false)}
        title="Save">
        <FlexButtonContainer>
          <Input
            id="input-component-1"
            label="Enter a name for this maze."
            placeholder="my favorite maze"
            style={containerStyles}
            value={name}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            onChange={handleChange}/>
          <Button variant='success' style={buttonStyles} disabled={!name} label='Save' onClick={handleSubmit}></Button>
        </FlexButtonContainer>
      </Modal>
    </div>
  )
}

export default Save

const FlexButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`