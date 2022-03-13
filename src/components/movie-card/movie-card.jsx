import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Container,Row ,Col,Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss'

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      
      <Row>
        <Col> 
      <Card id="card" >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="text-truncate">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button id="open" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
        </Col>
      </Row>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
