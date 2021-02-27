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
  return React.createElement('h1', {className: 'title-header' }, 'trovalyric');
}

function Description(){
  return (
    <p className="description">
      Straight up lyrics.      
    </p>
  )
}

export default App;
