export const wallFollower = (maze) => {

  const NORTH = 0
  const EAST = 1
  const SOUTH = 2
  const WEST = 3
  const EXIT_ROW = maze.length - 1
  const EXIT_COL = maze[0].length - 2
  const START_ROW = 0
  const START_COL = 1

  let solution = []

  for (let i = 0; i < maze.length; i++) {
    solution.push([])
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j]) {
        solution[i].push([false,false,false,false]) 
      } else {
        solution[i].push(null)
      }
    }
  }

  const isWallAhead = (currentRow, currentCol, heading) => {
    if (heading === NORTH) {
      if (solution[currentRow - 1][currentCol] === null) {
        solution[currentRow][currentCol][NORTH] = true
        return true
      } else {
        return false
      }
    } else if (heading === EAST) {
      if (solution[currentRow][currentCol + 1] === null) {
        solution[currentRow][currentCol][EAST] = true
        return true
      } else {
        return false
      }
    } else if (heading === SOUTH) {
      if (solution[currentRow + 1][currentCol] === null) {
        solution[currentRow][currentCol][SOUTH] = true
        return true
      } else {
        return false
      }
    } else if (heading === WEST) {
      if (solution[currentRow][currentCol - 1] === null) {
        solution[currentRow][currentCol][WEST] = true
        return true
      } else {
        return false
      }
    }
  }

  const traverse = (currentRow, currentCol, heading) => {

    if (currentRow === EXIT_ROW && currentCol === EXIT_COL) {
      solution[currentRow][currentCol][WEST] = true 
      return
    }

    if (currentRow === START_ROW && currentCol === START_COL) {
      return
    }

    // change heading to the right
    heading = (heading + 1) % 4

    if (isWallAhead(currentRow, currentCol, heading)) {
      // change heading to the left (factoring in the 'turn right' that happens a few lines up)
      heading = (heading + 2) % 4
      traverse(currentRow, currentCol, heading)
    } else {
      if (heading === NORTH) {
        traverse(currentRow - 1, currentCol, heading)
      } else if (heading === EAST) {
        traverse(currentRow, currentCol + 1, heading)
      } else if (heading === SOUTH) {
        traverse(currentRow + 1, currentCol, heading)
      } else if (heading === WEST) {
        traverse(currentRow, currentCol - 1, heading)
      }
    }
  }

  traverse(1, 1, SOUTH)

  return solution
}