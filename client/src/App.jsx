import React from 'react';
import logo from "./img/liftingClubLogo.jpg"
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello World, Welcome to the future of working out.</h1>
      <br />
      <h1>LiftingClub.com</h1>
      <div className="App-logo- container"><img src={logo} alt="noImg" className="Logo" /></div>
    </div>
  );
}

export default App;
