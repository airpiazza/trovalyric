// import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Header />
      <Description />
      <TextBoxes />
      <Search />
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

function Artist(){
  return(
    <div>
      <label for="artist" className="label" >Artist</label>
      <br />
      <input type="text" id="artist" name="artist" className="text-box" placeholder="   Enter artist name here..."/>
    </div>
  )
}

function Title(){
  return(
    <div>
      <label for="title" className="label" id="title-label">Title</label>
      <br />
      <input type="text" id="title" name="title" className="text-box" placeholder="   Enter song title here..."/>
    </div>
  )
}

function TextBoxes(){
  return(
    <div className="text-boxes">
        <Artist />
        <Title />
      </div>
  )
}

function Search(){
  return(
    <button>
      Search
    </button>
  )
}

export default App;
