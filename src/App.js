// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import User from "./User";

function App() {
  return (
    <div className="App">
      {/* <Randomapi /> */}
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/about">About</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/user">User</Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
