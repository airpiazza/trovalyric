// import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Header />
      <Description />
      <Form />
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

function Artist(props){
  return(
    <div>
      <label for="artist" className="label" >Artist</label>
      <br />
      <input type="text" id="artist" name="artist" className="text-box" placeholder="   Enter artist name here..." value={props.artist} onChange={(event) => props.change(event.target.value)}/>
    </div>
  )
}

function Title(props){
  return(
    <div>
      <label for="title" className="label" id="title-label">Title</label>
      <br />
      <input type="text" id="title" name="title" className="text-box" placeholder="   Enter song title here..." value={props.title} onChange={(event) => props.change(event.target.value)}/>
    </div>
  )
}

function Form(){
  const [artist, setArtist] = React.useState("");
  const [title, setTitle] = React.useState("");


  return(
    <>
      <form className="form">
          <Artist artist={ artist } change ={setArtist}/>
          <Title title={ title } change={setTitle}/>
      </form>
      <Search artist={ artist } title={ title }/>
    </>
  )
}

function Search(props){
  
  function displayInfo(e){
    console.log(props.artist + " " + props.title)
  }

  return(
    <button className="search-button" onClick={displayInfo}>
      Search
    </button>
  )
}

export default App;
