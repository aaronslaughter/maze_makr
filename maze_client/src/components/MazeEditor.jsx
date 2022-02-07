import React from 'react';
import styled from 'styled-components'
import EmptyCell from './EmptyCell';
import Wall from './Wall';

const MazeEditor = ({maze, setMaze}) => {

  const handleClick = (row, col) => {
    let tempGrid = maze.grid;
    tempGrid[row][col] = tempGrid[row][col] ? false : true
    setMaze({...maze, grid: tempGrid})
  }

  return (
    <Container>
      {maze.grid.map((row, rowIndex) => 
        <div key={rowIndex}>
          {row.map((column, colIndex) =>
            <div 
              key={colIndex}
              onMouseDown={() => handleClick(rowIndex, colIndex)}
            >
              {maze.grid[rowIndex][colIndex] ? 
                <EmptyCell/> : 
                <Wall/>
              }
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

export default MazeEditor;

const Container = styled.div`
  display: flex;
`
