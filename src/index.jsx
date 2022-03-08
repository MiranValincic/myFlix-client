import React from "react";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import { Container, Navbar, Nav } from "react-bootstrap";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="registration-view.jsx">Register</Nav.Link>
              <Nav.Link href="login-view.jsx">Login</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <MainView />
        </Container>
      </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
