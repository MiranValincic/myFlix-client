import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  CardGroup,
} from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [born, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;

    if (!name) {
      setUsernameErr("Username required");
      isReq = false;
    } else if (name.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password required");
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr("Password must be at least 8 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Email must be valid");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios
        .post("https://miran-flix.herokuapp.com/users", {
          Name: name,
          Password: password,
          Email: email,
          Born: born,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register");
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup id="card">
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      /> {''}
                      {usernameErr && <p id='error'>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Min 8 characters "
                    />
                    {passwordErr && <p id='error' >{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    {emailErr && <p id='error'>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Born:</Form.Label>
                    <Form.Control
                      type="date, 'yyyy-mm-dd'"
                      value={born}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter your birthday"
                    />
                  </Form.Group>

                  <Button
                    id="button-register"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};
