import './App.css';
import { useState, useEffect } from 'react';
import { generateBlankMaze } from './helper_methods/generators';
import Home from './pages/Home';
import MazeEditor from './components/MazeEditor';

function App() {

  const [maze, setMaze] = useState({
    height: 25, 
    width: 50,
    grid: []
  })

  useEffect(() => {
    setMaze({...maze, grid: generateBlankMaze(maze)})
  }, [])

  return (
    <div 
      className="App">
      <Home>
        <MazeEditor
          maze={maze}
          setMaze={setMaze}>
        </MazeEditor>
      </Home>
    </div>
  );
}

export default App;
