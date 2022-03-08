import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Form, Button, CardGroup } from "react-bootstrap";

import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [born, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, password, email, born);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(name) */
    props.onRegistration(name);
  };

  return (
    <Container>
      <Row>
        <Col>
        <CardGroup>
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
              />
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
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Born:</Form.Label>
              <Form.Control
                type="birthday"
                value={born}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Enter your birthday"
              />
            </Form.Group>

            <Button id="button-register" type="submit" onClick={handleSubmit}>
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
  onRegistration: PropTypes.func.isRequired,
};
