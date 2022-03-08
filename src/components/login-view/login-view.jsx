import React, { useState } from 'react';
import PropTypes from "prop-types";
import './login-view.scss'
import { Form, Button,Container,Row,Col, Card,CardGroup } from 'react-bootstrap';

export function LoginView(props) {
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(name);
  };

  return (
    <Container>
    <Row>
      <Col>
      <CardGroup>
            <Card>
                <Card.Body>
                <Card.Title>Please Log in</Card.Title>
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group> 
      <Button id='button-submit' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
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
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
  };