import React,{useState} from 'react';
import Card from './components/Card';
import Description from './components/Description';
import Replies from './components/Replies';
import sw from './data/data';
import './App.css';

function App() {

  const [character,setCharacter] = useState(null); 
  const [reply,setReply] = useState([]); 

  function charInformation(character){
    setCharacter(character);
  }

  function replyInformation(newReply){
    setReply(prevReply => [...prevReply, newReply]);    
  }

  function conditionalLoad(){
    if(character){
      return(
        <Description 
          character={character}
          replyInfo={replyInformation}
        />
      ); 
    }
  }

  var replies = reply.map(
    (rep) => {
      return(
        <div className='replySection'> 
          <h3>{rep.name} says: </h3>
          <Replies
          rep = {rep}
        />
        </div>
      );
    }
  );

  var cards = sw.map(
    (movie) => {
      return(
        <Card
          character={movie.best_character}
          title={movie.title}
          poster={movie.poster}
          year={movie.year}
          charInfo={charInformation}
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
      {replies}
    </div>
  );
}

export default App;