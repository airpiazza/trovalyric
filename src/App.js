// import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Header />
      <Description />
    </div>
  );
}

function Header(){
  return React.createElement('h1', null, 'trovalyric');
}

function Description(){
  return (
    <p>
      Straight up lyrics.      
    </p>
  )
}

export default App;
