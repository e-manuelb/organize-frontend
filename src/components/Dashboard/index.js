import * as React from "react";
import { Container, Navbar, Nav, NavDropdown, Stack } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export function Dashboard() {

  const navigate = useNavigate();

  return (
    <div sx={{ display: "flex" }}>
      <Stack gap={2}>
        <div>
          <Navbar
            collapseOnSelect
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
                    <NavDropdown.Item onClick={() => navigate('finances')}>
                      Finances
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('todo')}>
                      To do
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('diary')}>
                      Diary
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('study')}>
                      Study
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} onClick={() => navigate("/about")}>
                    About
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="mt-4">
          <Outlet />
        </div>
      </Stack>
    </div>
  );
}
