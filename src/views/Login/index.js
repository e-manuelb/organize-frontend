import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { LoginModel } from "../../models/LoginModel";
import { ToastSuccess, ToastError } from "../../components/Toasts/Toasts";
import { AuthService, setToken } from "../../services/Auth";

export function LoginIndex() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
  };

  const formLogin = useForm({
    defaultValues: LoginModel.createLogin(),
  });

  function logIn() {
    const form = { ...formLogin.getValues() };
    AuthService.login(form)
      .then((response) => {
        setToken(response.data);
        ToastSuccess("Successfully logged in!");
        navigate("/");
        document.body.style.background = '';
      })
      .catch((error) => {
        ToastError(
          "Something went wrong, check the fields or contact the administrator!"
        );
      });
  }
  useEffect(() => {
    document.body.style.background = '#212529';
  });

  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "15%" }}
      >
        <Card className="p-4">
          <Row>
            <Col>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h5 className="text-center">ORGANIZE</h5>
                <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    {...formLogin.register("email")}
                    type="email"
                    placeholder="Enter your email..."
                    required
                  />
                  <Form.Text className="text-muted">
                    We will not share your information with anyone.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...formLogin.register("password")}
                    placeholder="Enter your password..."
                    required
                  />
                </Form.Group>
                <Row>
                  <Col className="text-center mt-5">
                    <p>
                      Not registered yet? {" "}
                      <a href="/registro">Register</a>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center mt-5">
                    <Button variant="primary" type="submit" onClick={logIn}>
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
}