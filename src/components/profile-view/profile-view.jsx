import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormCheck,
} from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Password: "",
      Email: "",
      Born: "",
      FavoriteMovies: [],
      validated: false,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ validated: true });
    } else {
      e.preventDefault();
      this.setState({ validated: true });
      axios
        .put(
          `https://miran-flix.herokuapp.com/users/${Name}`,
          {
            Name: this.state.Name,
            Password: this.state.Password,
            Email: this.state.Email,
            Born: this.state.Born,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.setState({
            Name: response.data.Name,
            Password: response.data.Password,
            Email: response.data.Email,
            Born: response.data.Born,
          });

          localStorage.setItem("user", this.state.Name);

          window.open("/profile", "_self");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Delete a movie from FavoriteMovies list
  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://miran-flix.herokuapp.com/users/${Name}/favorites/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUser = (token) => {
    const Name = localStorage.getItem("user");
    axios
      .get(`https://miran-flix.herokuapp.com/users/${Name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Password: response.data.Password,
          Email: response.data.Email,
          Born: response.data.Born,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const Name = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`miran-flix.herokuapp.com/users/${Name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setName(value) {
    this.setState({
      Name: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Born: value,
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Name, Email, Born, Password } = this.state;

    return (
      <Container className="profile-view" align="center">
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form
                  noValidate
                  validated={this.state.validated}
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Name,
                      this.Password,
                      this.Email,
                      this.Born
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="New Username"
                      onChange={(e) => this.setName(e.target.value)}
                      required
                      minLength={2}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please use valid name
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="Password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                      minLength="8"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters long
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={this.editUser}
                    >
                      Update User
                    </Button>
                    <Button
                      className="ml-3"
                      variant="secondary"
                      onClick={() => this.onDeleteUser()}
                    >
                      Delete User
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>{Name} Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              {FavoriteMovies.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}
              <Row className="favorite-container">
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      FavoriteMovies.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Card
                          className="favorite-movie card-content"
                          key={movie._id}
                        >
                          <Card.Img
                            className="fav-poster"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body style={{ backgroundColor: "black" }}>
                            <Card.Title className="movie_title">
                              {movie.Title}
                            </Card.Title>
                            <Button
                              size="sm"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) => this.onRemoveFavorite(e, movie)}
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <div className="backButton">
          <Button
            id="open"
            variant="outline-primary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
        <br />
      </Container>
    );
  }
}