import './App.css';
import axios from 'axios'
import {BASE_URL} from './globals'
import { useState } from 'react';
import Home from './pages/Home';
import MazeEditor from './components/MazeEditor';
import Load from './components/Load';
import Save from './components/Save'
import Login from './components/Login'

function App() {

  const [user, setUser] = useState(false)

  const loginUser = (username) => {
    const login = async () => {
      const response = await axios.get(`${BASE_URL}/users/`)
      const foundUser = response.data.find((element) => element.username === username)
      if (foundUser) {
        setUser(foundUser)
      } else {
        await axios.post(`${BASE_URL}/users/`, {username: username})
      }
    }
    login()
  }


  return (
    <div className="App">
      <div>
        <Home>
          <MazeEditor>
            {user ? <Load></Load> : <Login loginUser={loginUser}></Login>}
            {user && <Save></Save>}
          </MazeEditor>
        </Home>
      </div>
    </div>
  );
}

export default App;
