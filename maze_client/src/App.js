import './App.css';
import axios from 'axios'
import {BASE_URL} from './globals'
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import MazeEditor from './components/MazeEditor';
import Footer from './components/Footer'

function App() {

  const [user, setUser] = useState(null)


  // makes a call to the api to wake up Heroku app which is likely asleep.
  useEffect(() => {
    const spinUpDb = async () => {
      await axios.get(`${BASE_URL}/users/`)
    }
    spinUpDb()
  }, [])

  const loginUser = (username) => {
    const login = async () => {
      let response = await axios.get(`${BASE_URL}/users/`)
      const foundUser = response.data.find((element) => element.username === username)
      if (foundUser) {
        setUser(foundUser)
      } else {
        response = await axios.post(`${BASE_URL}/users/`, {username: username})
        const newUser = response.data
        setUser(newUser)
      }
    }
    login()
  }


  return (
    <div className="App">
      <div>
        <Home>
          <MazeEditor
            user={user}
            loginUser={loginUser}>
          </MazeEditor>
          <Footer/>
        </Home>
      </div>
    </div>
  );
}

export default App;
