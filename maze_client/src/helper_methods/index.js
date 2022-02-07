export const generateMaze = (maze) => {
  let tempGrid = []

    for (let i = 0; i < maze.width; i++) {
      tempGrid.push([])
    }

    for (let i = 0; i < maze.width; i++) {
      for (let j = 0; j < maze.height; j++) {
        if (i === 0 && j === 1) {
          tempGrid[i].push(true)
        } else if (i === maze.height - 1 && j === maze.width - 2) {
          tempGrid[i].push(true)
        }else if (i === 0 || i === maze.width - 1) {
          tempGrid[i].push(false)
        } else if (j === 0 || j === maze.height - 1) {
          tempGrid[i].push(false)
        } else {
          tempGrid[i].push(true)
        }
      }
    }

    return tempGrid
}
