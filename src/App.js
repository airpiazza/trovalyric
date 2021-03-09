// import logo from './logo.svg';
import theLogo from './t_logo.png';
import './App.css';
import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/trovalyric/info">
        <Menu />
          <Info />
        </Route>
        <Route path="/trovalyric">
          <Menu />
          <Header />
          <Description />
          <Song />
        </Route>
      </Switch>
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
      <label htmlFor="artist" className="label" >Artist</label>
      <br />
      <input type="text" id="artist" name="artist" className="text-box" placeholder="   Enter artist name here..." value={props.artist} onChange={(event) => props.change(event.target.value)}/>
    </div>
  )
}

function Title(props){
  return(
    <div>
      <label htmlFor="title" className="label" id="title-label">Title</label>
      <br />
      <input type="text" id="title" name="title" className="text-box" placeholder="   Enter song title here..." value={props.title} onChange={(event) => props.change(event.target.value)}/>
    </div>
  )
}

function Song(){
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

  const [artist, setArtist] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [lyrics, setLyrics] = React.useState("");
  const [alreadyLoaded, setAlreadyLoaded] = React.useState(false);
  const [errore, setErrore] = React.useState(null);
  const [message, setMessage] = React.useState("");
  
  function displayInfo(e){
    console.log(props.artist + " " + props.title);
    setAlreadyLoaded(false)
    setArtist(props.artist);
    setTitle(props.title);
    fetch("https://api.lyrics.ovh/v1/"+props.artist+"/"+props.title)
      .then(res => res.json())
      .then(
        (result) => {
          setAlreadyLoaded(true);
          setLyrics(result.lyrics);
        },
        (error) => {
          setAlreadyLoaded(true);
          setErrore(error)
          setMessage("sorry, couldn't find lyrics for the song " + props.title + " by " + props.artist);
        }
      );
  }

  useEffect(() =>{
    console.log(lyrics)
  })

  if(artist==="" && title===""){  
    return(
      <>
        <button className="search-button" onClick={displayInfo}>
          Search
        </button>
        <h3>
        </h3>
        <p>
        </p>
      </>
    )
  }else if(errore){
    if(artist !== "" && title !== ""){
      if(!alreadyLoaded){
        return(
          <>
            <button className="search-button" onClick={displayInfo}>
              Search
            </button>
            <h3 className="song-info">
              {title + " by " + artist}
            </h3>
            <p>
              Looking for your song...
            </p>
            <div class="spinner"/>
          </>
        )
      }else{
        return(
          <>
            <button className="search-button" onClick={displayInfo}>
              Search
            </button>
            <h3 className="song-info">
              {title + " by " + artist}
            </h3>
            <p className="lyrics">
              {lyrics}
            </p>
            <p className="message">
              {message}
            </p>
          </>
        )
      }
    } else{
      return(
        <>
          <button className="search-button" onClick={displayInfo}>
            Search
          </button>
          <h3 className="song-info">
            Sorry, there's been an error: {errore.message}
          </h3>
          <p>
          </p>
        </>
      )
    }
  } else if(!alreadyLoaded){
    return(
      <>
        <button className="search-button" onClick={displayInfo}>
          Search
        </button>
        <h3 className="song-info">
          {title + " by " + artist}
        </h3>
        <p>
          Looking for your song...
        </p>
        <div className="spinner"/>
      </>
    )
  } else{
    return(
      <>
        <button className="search-button" onClick={displayInfo}>
          Search
        </button>
        <h3 className="song-info">
          {title + " by " + artist}
        </h3>
        <p className="lyrics">
          {lyrics}
        </p>
        <p className="message">
          {message}
        </p>
      </>
    )
  }
  
}

function Credit(){
  return(
    <h1 className="credit">
      Trovalyric was made using the <a target="_blank" rel="noreferrer" href="https://lyricsovh.docs.apiary.io/#">lyrics.ovh API</a>
    </h1>
  )
}

function Menu(){
  return(
    <header className="top-bar">
      <Link to="/trovalyric">
        <img src={theLogo} alt="trovalyric logo" className="trovalyric-logo"/>
      </Link>
      <nav className="nav">
        <Link to="/trovalyric/info">info</Link>
      </nav>
    </ header>
  )
}

function Info(){
  // let {thePath, theUrl} = useRouteMatch();
  return(
    <>
      <Credit />
      <Link to={`/trovalyric/info/help`}>
        <button className="search-button">
            Help
        </button>
      </Link>
      <Switch>
        <Route path={`/trovalyric/info/help`}>
      
            <Help />
          
        </Route>
      </Switch>
    </>
  );
}

function Help(){
  const steps = ["Type in the artist/band name.", "Type in the song.", "Click Search"];
  const showSteps = steps.map(function(step){
    return(<li key={step}>{step}</li>)
  });

  return(
    <div className="list-box">
      <ol>
        {showSteps}
      </ol>
    </div>
  );
}
export default App;
