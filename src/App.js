// import logo from './logo.svg';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Header />
      <Description />
      <Song />
      <Credit />
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
          console.log(lyrics)
        },
        (error) => {
          setAlreadyLoaded(true);
          setErrore(error)
          setLyrics("sorry, couldn't find lyrics for this song");
        }
      );
  }
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
      </>
    )
  }
  
}

function Credit(){
  return(
    <footer className="credit">
      <p>
        Made using the <a target="_blank" href="https://lyricsovh.docs.apiary.io/#">lyrics.ovh API</a>
      </p>
    </footer>
  )
}


export default App;
