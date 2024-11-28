import React, { useState } from 'react';
import sw from '../data/data';
import Movie from './Movie';

function Home() {
    const [character, setCharacter] = useState(null);
    const [ratios, setRatio] = useState({});

    console.log(character, ratios);

    function charInformation(character) {
        setCharacter(character);
    }

    function ratioInformation(movie, updRatio) {
        setRatio(prevRatios => ({
            ...prevRatios,
            [movie.title]: [...(prevRatios[movie.title] || []), updRatio]
        }));
    }

    var cards = sw.map((movie) => {
      const movieReplies = ratios[movie.title] || []; 
  
      return (
          <Movie
              key={movie.title}
              character={movie.best_character}
              title={movie.title}
              poster={movie.poster}
              year={movie.year}
              charInfo={charInformation}
              ratio={updRatio => ratioInformation(movie, updRatio)}
              movieReplies={movieReplies} 
          />
      );
  });
  

    return (
        <div className='card-container'>
            {cards}
        </div>
    );
}

export default Home;
