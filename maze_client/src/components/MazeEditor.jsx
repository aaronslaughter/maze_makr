import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Modal } from 'react-rainbow-components'
import { BASE_URL } from '../globals';
import { generateBlankMaze, generateMazeRecursiveDivision } from '../helper_methods/generators';
import { wallFollower } from '../helper_methods/solvers';
import EmptyCell from './EmptyCell';
import Wall from './Wall';
import FixedWall from './FixedWall';
import Start from './Start';
import Finish from './Finish';
import WallFollowerCell from './WallFollowerCell';
import Maze from './Maze'

const initialHeight = 10;
const initialWidth = 15;

const MazeEditor = ({children}) => {

  const [maze, setMaze] = useState({
    height: initialHeight, 
    width: initialWidth,
    grid: generateBlankMaze(initialHeight, initialWidth)
  })

  const [blankMazeModal, toggleBlankMazeModal] = useState(false)

  
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
        {children}
      </FlexButtonContainer>
      <FlexButtonContainer>
        <Button variant='brand' onClick={() => toggleBlankMazeModal(true)}>Create Blank Maze
          <Modal id="modal-1" title='Choose a size' isOpen={blankMazeModal} onRequestClose={() => toggleBlankMazeModal(false)}>
            <FlexButtonContainer>
              <Button label='10x15' onClick={() => createBlankMaze(10, 15)}></Button>
              <Button label='20x30' onClick={() => createBlankMaze(20, 30)}></Button>
              <Button label='30x60' onClick={() => createBlankMaze(30, 60)}></Button>
            </FlexButtonContainer>
          </Modal>
        </Button>
        {maze && <Button variant='brand' onClick={randomizeMaze}>Randomize</Button>}
        {maze && <Button variant='brand' onClick={solveWallFollower}>Wall Follower Solution</Button>}
      </FlexButtonContainer>
      <MazeContainer>
        <Maze
          maze={maze}
          toggleCell={toggleCell}
          renderCell={renderCell}>
        </Maze>
      </MazeContainer>
    </div>
  )
}

export default MazeEditor;


const FlexButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin: 1em;
`

const MazeContainer = styled.div`
  display: flex;
  justify-content: center;
`