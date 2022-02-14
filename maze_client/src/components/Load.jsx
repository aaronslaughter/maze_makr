import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Drawer, Modal, Input } from 'react-rainbow-components'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Load = ({user, setMaze, toggleSolved}) => {

  const containerStyles = {
    maxWidth: 300,
  }

  const buttonStyles = {
    maxWidth: 150,
  }

  const [drawer, toggleDrawer] = useState(false)
  const [isOpen, toggleIsOpen] = useState(false)
  const [mazes, setMazes] = useState([])
  const [newName, setNewName] = useState('')

  const handleDrawerOpen = () => {
    const fetchMazes = async () => {
      const response = await axios.get(`${BASE_URL}/users/${user.id}`)
      setMazes(response.data.mazes)
    }

    fetchMazes()

    toggleDrawer(true)
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const squareAndLoadMaze = (height, width, maze) => {
    let squaredGrid = []

    for (let i = 0; i < height; i++) {
      squaredGrid.push([])
      for (let j = 0; j < width; j++) {
        squaredGrid[i].push([])
      }
    }

    for (let i = 0; i < maze.length; i++) {
      squaredGrid[Math.floor(i / width)][i % width] = maze[i]
    }

    setMaze({height: height, width: width, grid: squaredGrid})
    toggleSolved(false)
  }

  const deleteMaze = (id) => {
    const deleteAndFetch = async () => {
      await axios.delete(`${BASE_URL}/mazes/${id}`)
      const response = await axios.get(`${BASE_URL}/users/${user.id}`)
      setMazes(response.data.mazes)
    }
    deleteAndFetch()
  }

  const updateMaze = (id, newName) => {
    const updateAndFetch = async () => {
      let response = await axios.get(`${BASE_URL}/mazes/${id}`)
      const data = {
        name: newName,
        user_id: response.data.user_id,
        maze: response.data.maze
      }

      await axios.put(`${BASE_URL}/mazes/${id}`, data)
      response = await axios.get(`${BASE_URL}/users/${user.id}`)
      setMazes(response.data.mazes)
    }

    updateAndFetch()
    toggleIsOpen(false)
    setNewName('')
  }

  return (
    <div>
      <div
        className="rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto rainbow-flex_wrap">
        <div className="rainbow-flex rainbow-flex_row">
            <div className="rainbow-align-content_center rainbow-p-medium rainbow-m_auto">
                <Button
                  id="button-1"
                  className="rainbow-m-around_medium"
                  label="Load Maze"
                  variant="success"
                  onClick={() => handleDrawerOpen()}/>
            </div>
        </div>
        <Drawer
          id="drawer-1"
          header="Saved Mazes"
          isOpen={drawer}
          onRequestClose={() => toggleDrawer(false)}>
          <DrawerWrapper>
            {mazes.map((element, index) =>
              <FlexButtonContainer key={index}>
                <Button size='large' variant='brand' 
                  onClick={() => squareAndLoadMaze(element.height, element.width, element.maze)}>
                    {element.height}x{element.width} {element.name}
                </Button>
                <Button variant='border-filled' label='Rename' size='small'
                  onClick={() => toggleIsOpen(true)}>
                </Button>
                <Button variant='destructive' label='Delete' size='small'
                  onClick={() => deleteMaze(element.id)}>
                </Button>
                <Modal id="modal-1" title='Rename' isOpen={isOpen} onRequestClose={() => toggleIsOpen(!isOpen)}>
                  <FlexInputContainer>
                    <Input
                      id="input-component-1"
                      label="Enter a new name for this maze."
                      placeholder={element.name}
                      style={containerStyles}
                      value={newName}
                      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                      onChange={handleChange}/>
                    <Button style={buttonStyles} variant='success' label='Submit' onClick={() => updateMaze(element.id, newName)}></Button>
                  </FlexInputContainer>
                </Modal>
              </FlexButtonContainer>
            )}
          </DrawerWrapper>
        </Drawer>
      </div>
    </div>
  )
}

export default Load

const FlexButtonContainer = styled.div`
  display: flex;
  gap: 1em;
`
const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`

const FlexInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap:0.5em
`
