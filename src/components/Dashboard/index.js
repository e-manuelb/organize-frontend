import * as React from "react";
import { useHistory } from "react-router";
import { Container, Navbar, Nav, NavDropdown, Stack } from "react-bootstrap";

export default function Dashboard(props) {
  const history = useHistory();
  const navigation = (url) => {
    history.push(url);
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Stack gap={2}>
        <div>
          <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            bg="dark"
            variant="dark"
          >
            <Container>
              <Navbar.Brand href="#home">ORGANIZE</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Menu" id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigation("/finances/")}>
                      Finances
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigation("/toDo/")}>
                      To do
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigation("/diary/")}>
                      Diary
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigation("/study/")}>
                      Study
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} onClick={() => navigation("/about")}>
                    About
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div style={{marginTop: '100px'}}> {props.children}</div>
      </Stack>
    </Container>
  );
}
