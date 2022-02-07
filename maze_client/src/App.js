import './App.css';
import { useState, useEffect } from 'react';
import { generateMaze } from './helper_methods';
import Home from './pages/Home';
import MazeEditor from './components/MazeEditor';

function App() {

  const [maze, setMaze] = useState({
    width: 15, 
    height: 15,
    grid: []
  })

  useEffect(() => {
    setMaze({...maze, grid: generateMaze(maze)})
  }, [])

  return (
    <div 
      className="App">
      <Home>
        <MazeEditor
          maze={maze}
          setMaze={setMaze}
        >
        </MazeEditor>
      </Home>
    </div>
  );
}

export default App;
