import React, { useState } from 'react'
import { Button, Drawer } from 'react-rainbow-components'
import axios from 'axios'
import { BASE_URL } from '../globals'
import MazeIcon from './MazeIcon'

const Load = () => {

  const [drawer, toggleDrawer] = useState(false)
  const [mazes, setMazes] = useState([])

  const handleDrawerOpen = () => {
    const fetchMazes = async () => {
      const response = await axios.get(`${BASE_URL}/mazes`)
      setMazes(response.data)
    }

    fetchMazes()

    toggleDrawer(true)
  }

  return (
    <div>
      <div
        className="rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto rainbow-flex_wrap">
        <div className="rainbow-flex rainbow-flex_row">
            <div className="rainbow-align-content_center rainbow-p-medium rainbow-m_auto">
                <Button
                    id="button-1"
                    className="rainbow-m-around_medium"
                    label="Load Maze"
                    onClick={() => handleDrawerOpen()}/>
            </div>
        </div>
        <Drawer
          id="drawer-1"
          header="Saved Mazes"
          isOpen={drawer}
          onRequestClose={() => toggleDrawer(false)}>
          {mazes.map((element, index) =>
            <div key={index}>
              <MazeIcon maze={element}></MazeIcon>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  )
}

export default Load