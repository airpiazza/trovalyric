import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Header />;
    </div>
  );
}

function Header(){
  return React.createElement('h1', null, 'trovalyric');
}

export default App;
