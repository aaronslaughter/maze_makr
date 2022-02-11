import './App.css';
import axios from 'axios'
import {BASE_URL} from './globals'
import { useState } from 'react';
import Home from './pages/Home';
import MazeEditor from './components/MazeEditor';
import Load from './components/Load';
import Login from './components/Login'

function App() {

  const [user, setUser] = useState(false)

  const loginUser = (username) => {
    const login = async () => {
      const response = await axios.get(`${BASE_URL}/users`)
      const foundUser = response.data.find((element) => element.username === username)
      if (foundUser) {
        setUser(foundUser)
      } else {
        await axios.post(`${BASE_URL}/users/`, {username: username, mazes: []})
      }
    }
    login()
  }


  return (
    <div 
      className="App">
      <Home>
        <MazeEditor>
          {user ? <Load></Load> : <Login loginUser={loginUser}></Login>}
        </MazeEditor>
      </Home>
    </div>
  );
}

export default App;
