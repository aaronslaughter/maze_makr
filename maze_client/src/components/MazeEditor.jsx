import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Chip } from 'react-rainbow-components'
import { generateBlankMaze, generateMazeRecursiveDivision } from '../helper_methods/generators';
import { wallFollower } from '../helper_methods/solvers';
import EmptyCell from './cells/EmptyCell';
import Wall from './cells/Wall';
import FixedWall from './cells/FixedWall';
import Start from './cells/Start';
import Finish from './cells/Finish';
import WallFollowerCell from './cells/WallFollowerCell';
import Maze from './Maze';
import Save from './Save';
import Load from './Load';
import Login from './Login';

const initialHeight = 10;
const initialWidth = 15;

const MazeEditor = ({user, loginUser}) => {

  const [maze, setMaze] = useState({
    height: initialHeight, 
    width: initialWidth,
    grid: generateBlankMaze(initialHeight, initialWidth)
  })

  let fontSize

  if (maze.width > 50) {
    fontSize = '.8'
  } else if (maze.width > 20) {
    fontSize = '1.3'
  } else {
    fontSize = '2.5'
  }

  const mazeContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: fontSize + 'vw'
  }  

  const [isOpen, toggleIsOpen] = useState(false)

  const [solved, toggleSolved] = useState(false)
  const [solution, setSolution] = useState(null)

  const toggleCell = (row, col) => {
    toggleSolved(false)
    setSolution(null)
    // excludes border rows and columns
    if (row > 0 && row < maze.height - 1 &&
      col > 0 && col < maze.width - 1) {

      let tempGrid = maze.grid;
      tempGrid[row][col] = tempGrid[row][col] ? false : true
      setMaze({...maze, grid: tempGrid})
    }
  }

  const createBlankMaze = (height, width) => {
    toggleSolved(false)
    setMaze({height: height, width: width, grid: generateBlankMaze(height, width)})
  }

  const randomizeMaze = () => {

    toggleSolved(false)
    setSolution(null)
    let blankMaze = generateBlankMaze(maze.height, maze.width)

    setMaze({...maze, grid: generateMazeRecursiveDivision(
      blankMaze, 
      [
        {
          row: 0,
          col: 1
        },
        {
          row: maze.height - 1,
          col: maze.width - 2
        }
      ],
      {
        topLeft: {
          row: 1,
          col: 1
        }, 
        bottomRight: {
          row: maze.height - 2,
          col: maze.width - 2
        }
      }
    )})
  }

  const solveWallFollower = () => {
    setSolution(wallFollower(maze.grid))
    toggleSolved(true)
  }

  const renderCell = (row, col) => {
    if (row === 0 && col === 1) {
      return <Start></Start>
    } else if (row === maze.height - 1 && col === maze.width - 2){
      return <Finish></Finish>
    } else if (row === 0 || row === maze.height - 1) {
      return <FixedWall></FixedWall>
    } else if (col === 0 || col === maze.width - 1) {
      return <FixedWall></FixedWall>
    } else if (maze.grid[row][col]) {
      if (solved) {
        let classString = ''
        if (solution[row][col][0]) {
          classString = classString + 'north'
        }
        if (solution[row][col][1]) {
          classString = classString + 'east'
        }
        if (solution[row][col][2]) {
          classString = classString + 'south'
        }
        if (solution[row][col][3]) {
          classString = classString + 'west'
        }

        return <WallFollowerCell classString={classString}></WallFollowerCell>
      } else {
        return <EmptyCell></EmptyCell>
      }
    } else {
      return <Wall></Wall>
    }
  }

  return (
    <div>
      <FlexButtonContainer>
        {user && <Chip label={'Welcome, ' + user.username} variant='base' size='large'></Chip>}
        {user ? <Load user={user} setMaze={setMaze}></Load> : <Login loginUser={loginUser}></Login>}
        {user && <Save user={user} maze={maze}></Save>}
      </FlexButtonContainer>
      <FlexButtonContainer>
        <Button variant='brand' onClick={() => toggleIsOpen(true)}>Create Blank Maze</Button>
        <Modal id="modal-1" title='Choose a size' isOpen={isOpen} onRequestClose={() => toggleIsOpen(!isOpen)}>
          <FlexButtonContainer>
            <Button variant='brand' label='10x15' onClick={() => createBlankMaze(10, 15)}></Button>
            <Button variant='brand' label='20x30' onClick={() => createBlankMaze(20, 30)}></Button>
            <Button variant='brand' label='30x60' onClick={() => createBlankMaze(30, 60)}></Button>
          </FlexButtonContainer>
        </Modal>
        {maze && <Button variant='brand' onClick={randomizeMaze}>Randomize</Button>}
        {maze && <Button variant='brand' onClick={solveWallFollower}>Wall Follower Solution</Button>}
      </FlexButtonContainer>
      <div style={mazeContainerStyle}>
        <Maze
          maze={maze}
          toggleCell={toggleCell}
          renderCell={renderCell}>
        </Maze>
      </div>
    </div>
  )
}

export default MazeEditor;


const FlexButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 1em;

  @media only screen and (max-width: 40em) {
    flex-direction: column;
    align-items: center;
  }
`