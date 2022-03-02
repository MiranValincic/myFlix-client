import React from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Iron Man', Description: 'Iron Man tells the story of Tony Stark, a billionaire industrialist and genius inventor who is kidnapped and forced to build a devastating weapon. Instead, using his intelligence and ingenuity, Tony builds a high-tech suit of armor and escapes captivity.', Genre: 'Action', Director: 'John Favreau', ImagePath: '...'},
            { _id: 2, Title: 'Iron Man2', Description: 'After Tony Stark announces to the World that he is Iron Man. He faces many problems in his Life, His Lifesource is Poisoning him, The US Government wants his tech, and someone is out to kill Stark.', Genre: 'Action', Director: 'John Favreau', ImagePath: '...'},
            { _id: 3, Title: 'Thor', Description: 'In Norse mythology, Thor (/θɔːr/; from Old Norse: Þórr [ˈθoːrː]) is a hammer-wielding god associated with lightning, thunder, storms, sacred groves and trees, strength, the protection of mankind, hallowing, and fertility. ... By way of Odin, Thor has numerous brothers, including Baldr.', Genre: 'Superhero', Director: 'Alan Taylor', ImagePath: '...'}
          ],
          selectedMovie: null
        }
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const { movies, selectedMovie } = this.state;
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
}

export default MainView;