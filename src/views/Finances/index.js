import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { financesModel } from "../../models/financesModel";
import {
  Table,
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import financesServices from "../../services/financesService";

export function FinancesIndex() {
  const [ID, setID] = useState();
  const [finances, setFinances] = useState([]);
  const [show, setShow] = useState(false);

  const closeDeleteModal = () => setShow(false);
  const showDeleteModal = (id) => {
    setID(id);
    console.log(ID);
    setShow(true);
  };

  const financesForm = useForm({
    defaultValues: financesModel.createFinances(),
  });

  function deleteFinance() {
    financesServices
      .deleteFinance(ID)
      .then(() => {
        console.log("Did it work!");
        closeDeleteModal();
        getAllFinances();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function createFinance() {
    const createFinance = { ...financesForm.getValues() };
    financesServices
      .addFinance(createFinance)
      .then(() => {
        console.log("Did it work!");
        financesForm.reset(financesModel.createFinances());
        getAllFinances();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function getAllFinances() {
    financesServices
      .getAllFinances()
      .then((response) => {
        setFinances(response.data);
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  useEffect(() => {
    getAllFinances();
  }, []);

  return (
    <Container>
      <Form>
        <Row className="g-2 mb-3">
          <Col md="6" sm="6" lg="6">
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Select the category"
            >
              <Form.Select
                {...financesForm.register("category")}
                aria-label="Floating label select example"
              >
                <option>Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Transport">Transport</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md="6" sm="6" lg="6">
            <FloatingLabel controlId="floatingInputGrid" label="Description">
              <Form.Control
                {...financesForm.register("description")}
                type="description"
                placeholder="Set the description"
              />
            </FloatingLabel>
          </Col>
          <Col md="6" sm="6" lg="6">
            <FloatingLabel controlId="floatingInputGrid" label="Location">
              <Form.Control
                {...financesForm.register("location")}
                type="location"
                placeholder="Set the location"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Price">
              <Form.Control
                {...financesForm.register("price")}
                type="price"
                placeholder="Set the Price"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Transaction date"
            >
              <Form.Control
                {...financesForm.register("transactionDate")}
                type="transactionDate"
                placeholder="Set the transaction date"
              />
            </FloatingLabel>
          </Col>
          <Col md className="align-self-center text-center">
            <Button variant="dark" onClick={createFinance}>
              Register
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price ($)</th>
            <th>Transaction date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((item) => (
            <tr key={item.id}>
              <td>{item._id}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>{item.transactionDate}</td>
              <td className="text-center">
                <ButtonGroup aria-label="Basic example">
                  <Button variant="outline-primary">Update</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => showDeleteModal(item._id)}
                  >
                    Delete
                  </Button>
                  <Button variant="outline-warning">Info</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete modal */}
      <Modal show={show} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete finance</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're deleting your finance, are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteFinance}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
