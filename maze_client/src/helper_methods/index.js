export const generateMaze = (maze) => {
  let tempGrid = []

  for (let i = 0; i < maze.height; i++) {
    tempGrid.push([])
    for (let j = 0; j < maze.width; j++) {
      tempGrid[i].push([])
    }
  }

  for (let i = 0; i < maze.height; i++) {
    for (let j = 0; j < maze.width; j++) {
      if (i === 0 && j === 1) {
        tempGrid[i][j] = true
      } else if (i === maze.height - 1 && j === maze.width - 2) {
        tempGrid[i][j] = true
      } else if (i === 0 || i === maze.height - 1) {
        tempGrid[i][j] = false
      } else if (j === 0 || j === maze.width - 1) {
        tempGrid[i][j] = false
      } else {
        tempGrid[i][j] = true
      }
    }
  }

  return tempGrid
}
