import React from 'react'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className='logoContainer'>
        <h2>Logo</h2>
      </div>
      <div className="burgerContainer">
        <div className="burgerTrigger"></div>
        <div className="burgerMenu"></div>
      </div>
      <div className="profileContainers">
        <div className="profileContents">
          <p className="name">Hello, Test</p>
          <p>test@gmail.com</p>
        </div>
      </div>

      <div className="contentsContainer">
        <ul>
          <li>
            <a href="/">Page 1</a>
          </li>
          <li>
            <a href="/page2">Page 2</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar