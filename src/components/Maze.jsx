import React from 'react'
import styled from 'styled-components'

const Maze = ({maze, toggleCell, renderCell}) => {
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
    </div>
  )
}

export default Maze

const Container = styled.div`
display: flex;
`
