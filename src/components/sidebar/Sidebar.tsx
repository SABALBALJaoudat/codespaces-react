import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(false);
  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div className='logoContainer'>
        <h2>Logo</h2>
      </div>
      <div className={closeMenu === false ? "burgerContainer" : "burgerContainer active"}>
        <div className="burgerTrigger"
          onClick={() => {
            handleCloseMenu()
          }}>
        </div>
        <div className="burgerMenu"></div>
      </div>
      <div className="profileContainers">
        <p>Img</p>
        <div className="profileContents">
          <p className="name">Hello, Test</p>
          <p>test@gmail.com</p>
        </div>
      </div>

      <div className="contentsContainer">
        <ul>
          <li className={location.pathname === "/" ? "selected" : ""}>
            <img></img>
            <a href="/">Page 1</a>
          </li>
          <li className={location.pathname === "/page2" ? "selected" : ""}>
            <img></img>
            <a href="/page2">Page 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar