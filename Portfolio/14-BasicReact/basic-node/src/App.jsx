import React,{useState} from 'react';
import Card from './components/Card';
import Description from './components/Description';
import sw from './data/data';
import './App.css';

function App() {

  const [character,setCharacter] = useState(null); 
  const [reply,setReply] = useState([]); 
  const [ratio,setRatio] = useState([]); 

  function charInformation(character){
    setCharacter(character);
  }

  function replyInformation(character,newReply){
    setReply(prevReplies => ({
      ...prevReplies,
      [character.name]: [...(prevReplies[character.name] || []), newReply]
    }));
  }    

  function ratioInformation(movie,updRatio){
    setRatio(prevRatios => ({
      ...prevRatios,
      [movie.title]: [...(prevRatios[movie.title] || []), updRatio]
    }));
  }

  function conditionalLoad(){
    if(character){
      const movieReplies = reply[character.name] || [];
      return(
        <Description 
          character={character}
          replyInfo={newReply => replyInformation(character, newReply)}
          replies={movieReplies}
        />
      ); 
    }
  }

  var cards = sw.map(
    (movie) => {
      return(
        <Card
          character={movie.best_character}
          title={movie.title}
          poster={movie.poster}
          year={movie.year}
          charInfo={charInformation}
          ratio={updRatio => ratioInformation(movie, updRatio)}
        />
      );
    }
  );

  return (
    <div className="App"> 
      <div className='card-container'>
        {cards}
      </div>
      {conditionalLoad()}
    </div>
  );
}

export default App;