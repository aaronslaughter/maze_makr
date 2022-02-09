import React, { useState } from 'react';
import styled from 'styled-components'
import { generateBlankMaze, generateMazeRecursiveDivision } from '../helper_methods/generators';
import { wallFollower } from '../helper_methods/solvers';
import EmptyCell from './EmptyCell';
import Wall from './Wall';
import FixedWall from './FixedWall';
import Start from './Start';
import Finish from './Finish';
import WallFollowerCell from './WallFollowerCell';

const MazeEditor = ({maze, setMaze}) => {

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

  const randomizeMaze = () => {

    toggleSolved(false)
    setSolution(null)
    let blankMaze = generateBlankMaze(maze)

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
      {maze.grid.map((row, rowIndex) => 
        <Container key={rowIndex}>
          {row.map((col, colIndex) =>
            <div 
              key={colIndex}
              onMouseDown={() => toggleCell(rowIndex, colIndex)}>
              {renderCell(rowIndex, colIndex)}
            </div>
          )}
        </Container>
      )}
      <button onClick={randomizeMaze}>Randomize</button>
      <button onClick={solveWallFollower}>Wall Follower Solution</button>
    </div>
  )
}

export default MazeEditor;

const Container = styled.div`
display: flex;
`
