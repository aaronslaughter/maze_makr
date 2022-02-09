export const generateBlankMaze = (maze) => {
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

export const generateMazeRecursiveDivision = (maze, entrances, subchamber) => {

  const isAdjacent = (cell1, cell2) => {
    if (cell2.col === cell1.col && cell2.row === cell1.row + 1) {
      return true
    } else if (cell2.col === cell1.col + 1 && cell2.row === cell1.row) {
      return true
    } else if (cell2.col === cell1.col && cell2.row === cell1.row - 1) {
      return true
    } else if (cell2.col === cell1.col - 1 && cell2.row === cell1.row) {
      return true
    } else {
      return false
    }
  }
  

  const generate = (entrances, subchamber) => {
    let height = subchamber.bottomRight.row - subchamber.topLeft.row + 1
    let width = subchamber.bottomRight.col - subchamber.topLeft.col + 1

    // if subchamber can be divided
    if (width > 1 && height > 1) {
      
      if (width === 2 && height === 2) {

        let adjacent = false

        for (let i = 0; i < entrances.length; i++) {
          if (isAdjacent({row: subchamber.topLeft.row, col: subchamber.topLeft.col}, {row: entrances[i].row, col: entrances[i].col})) {
            adjacent = true
          }
        }

        if (!adjacent) {
          maze[subchamber.topLeft.row][subchamber.topLeft.col] = false
          return
        }

        adjacent = false

        for (let i = 0; i < entrances.length; i++) {
          if (isAdjacent({row: subchamber.topLeft.row + 1, col: subchamber.topLeft.col}, {row: entrances[i].row, col: entrances[i].col})) {
            adjacent = true
          }
        }

        if (!adjacent) {
          maze[subchamber.topLeft.row + 1][subchamber.topLeft.col] = false
          return
        }

        adjacent = false

        for (let i = 0; i < entrances.length; i++) {
          if (isAdjacent({row: subchamber.topLeft.row, col: subchamber.topLeft.col + 1}, {row: entrances[i].row, col: entrances[i].col})) {
            adjacent = true
          }
        }

        if (!adjacent) {
          maze[subchamber.topLeft.row][subchamber.topLeft.col + 1] = false
          return
        }

        adjacent = false

        for (let i = 0; i < entrances.length; i++) {
          if (isAdjacent({row: subchamber.topLeft.row + 1, col: subchamber.topLeft.col + 1}, {row: entrances[i].row, col: entrances[i].col})) {
            adjacent = true
          }
        }

        if (!adjacent) {
          maze[subchamber.topLeft.row + 1][subchamber.topLeft.col + 1] = false
          return
        }

        return
      } // choose to divide the longer side
      else if (width > height) {

        // pick a random column to fill in
        let ranCol = Math.floor(Math.random() * (subchamber.bottomRight.col + 1 - subchamber.topLeft.col) + subchamber.topLeft.col)
        let ranRow

        // check if filling in that column would block an entrance, if yes then pick a new row
        let adjacencies = 1

        while (adjacencies > 0) {
          adjacencies = 0
        
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < entrances.length; j++) {
              if (isAdjacent({row: i + subchamber.topLeft.row, col: ranCol}, {row: entrances[j].row, col: entrances[j].col})) {
                adjacencies++
              }
            }
          }

          if (adjacencies > 1) {
            ranCol = Math.floor(Math.random() * (subchamber.bottomRight.col + 1 - subchamber.topLeft.col) + subchamber.topLeft.col)
          } else if ( adjacencies === 1) {

            for (let i = 0; i < height; i++) {
              for (let j = 0; j < entrances.length; j++) {
                if (isAdjacent({row: i + subchamber.topLeft.row, col: ranCol}, {row: entrances[j].row, col: entrances[j].col})) {
                  ranRow = i + subchamber.topLeft.row
                }
              }
            }

            adjacencies = 0

          } else {
            ranRow = Math.floor(Math.random() * (subchamber.bottomRight.row + 1 - subchamber.topLeft.row) + subchamber.topLeft.row)
          }
        }

        // fill in the column
        for (let i = 0; i < height; i++) {
          maze[i + subchamber.topLeft.row][ranCol] = false
        }

        // create an opening
        maze[ranRow][ranCol] = true

        // add new entrance to list
        entrances.push({row: ranRow, col: ranCol})

        // create subchambers
        let newChamber1 = {
          topLeft:{
            row: subchamber.topLeft.row,
            col: subchamber.topLeft.col
          }, 
          bottomRight:{
            row: subchamber.bottomRight.row,
            col: ranCol - 1
          }
        }
        let newChamber2 = {
          topLeft:{
            row: subchamber.topLeft.row,
            col: ranCol + 1
          }, 
          bottomRight:{
            row: subchamber.bottomRight.row,
            col: subchamber.bottomRight.col
          }
        }
        // recursive calls
        generate(entrances, newChamber1)
        generate(entrances, newChamber2)

      } else {

        // pick a random row to fill in
        let ranRow = Math.floor(Math.random() * (subchamber.bottomRight.row + 1 - subchamber.topLeft.row) + subchamber.topLeft.row)
        let ranCol

        // check if filling in the row would block an entrance, if yes then pick a new row
        let adjacencies = 1
        
        while (adjacencies > 0) {
          adjacencies = 0

          for (let i = 0; i < width; i++) {
            for (let j = 0; j < entrances.length; j++) {
              if (isAdjacent({row: ranRow, col: i + subchamber.topLeft.col},{row: entrances[j].row, col: entrances[j].col})) {
                adjacencies++
              }
            }
          }

          if (adjacencies > 1) {
            ranRow = Math.floor(Math.random() * (subchamber.bottomRight.row + 1 - subchamber.topLeft.row) + subchamber.topLeft.row)
          } else if (adjacencies === 1) {
            for (let i = 0; i < width; i++) {
              for (let j = 0; j < entrances.length; j++) {
                if (isAdjacent({row: ranRow, col: i + subchamber.topLeft.col},{row: entrances[j].row, col: entrances[j].col})) {
                  ranCol = i + subchamber.topLeft.col
                }
              }
            }

            adjacencies = 0

          } else {
            ranCol = Math.floor(Math.random() * (subchamber.bottomRight.col + 1 - subchamber.topLeft.col) + subchamber.topLeft.col)
          }
        }

        // fill in the row
        for (let i = 0; i < width; i++) {
          maze[ranRow][i + subchamber.topLeft.col] = false
        }

        // create an opening
        // let ranCol = Math.floor(Math.random() * (subchamber.bottomRight.col + 1 - subchamber.topLeft.col) + subchamber.topLeft.col)
        maze[ranRow][ranCol] = true

        // add new entrance to list
        entrances.push({row: ranRow, col: ranCol})

        // create subchambers
        let newChamber1 = {
          topLeft:{
            row: subchamber.topLeft.row,
            col: subchamber.topLeft.col
          }, 
          bottomRight:{
            row: ranRow - 1,
            col: subchamber.bottomRight.col
          }
        }
        let newChamber2 = {
          topLeft:{
            row: ranRow + 1,
            col: subchamber.topLeft.col
          }, 
          bottomRight:{
            row: subchamber.bottomRight.row,
            col: subchamber.bottomRight.col
          }
        }
        generate(entrances, newChamber1)
        generate(entrances, newChamber2)


      }
    } else {
      // subchamber is minimally sized
      return
    }
  }

  generate(entrances, subchamber)

  return maze
}
