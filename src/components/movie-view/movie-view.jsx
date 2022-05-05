import React, { useState } from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export class MovieView extends React.Component {
  addFavourite = (event, movie) => {
    event.preventDefault();
    const Name = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .post(
        `https://miran-flix.herokuapp.com/users/${Name}/favorites/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button id="open" variant="link">{movie.Genre.Name}</Button>
                </Link>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button id="open" variant="link">{movie.Director.Name}</Button>
                </Link>
              </div>

              <Button variant="outline-light" onClick={() => onBackClick(null)}>
                Back
              </Button>
              <Button
          variant="secondary"
          value={movie._id}
          onClick={e => this.addFavourite(e, movie)}
        >
          Add to favourites
        </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
