import React from 'react'
import {Button} from 'react-rainbow-components'

const MazeIcon = ({maze}) => {
  return (
    <div>
      <Button>{maze.height}x{maze.width} {maze.name}</Button>
    </div>
  )
}

export default MazeIcon