import React from 'react';
import './App.css';
import Sidebar, { SidebarItem } from "./sidebar_2/Sidebar_2";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <SidebarItem icon={""} text="Home" active alert={false} />
      </Sidebar>
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
