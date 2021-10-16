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
  Text,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from "@mui/icons-material/Info";
import financesServices from "../../services/financesService";

export function FinancesIndex() {
  const [ID, setID] = useState();
  const [total, setTotal] = useState();
  const [finances, setFinances] = useState([]);
  const [financesByID, setFinancesByID] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [rest, setRest] = useState();
  let salary = 30000;

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  const closeUpdateModal = () => setShowUpdate(false);
  const showUpdateModal = (id) => {
    infoFinance(id);
    setID(id);
    setShowUpdate(true);
  };

  const closeInfoModal = () => setShowInfo(false);

  const showInfoModal = (id) => {
    infoFinance(id);
    setShowInfo(true);
  };

  const updateForm = useForm({
    defaultValues: financesModel.createFinances(),
  });

  const financesForm = useForm({
    defaultValues: financesModel.createFinances(),
  });

  function getAllFinances() {
    financesServices
      .getAllFinances()
      .then((response) => {
        setFinances(response.data);
        getSum(response);
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

  function updateFinance() {
    const updateFinance = { ...updateForm.getValues() };
    financesServices
      .updateFinance(ID, updateFinance)
      .then(() => {
        console.log("Did it work!");
        updateForm.reset(financesModel.createFinances());
        closeUpdateModal();
        getAllFinances();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

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

  function infoFinance(id) {
    financesServices
      .getFinanceByID(id)
      .then((response) => {
        setFinancesByID([response.data]);
      })
      .catch((error) => {
        console.log("Something went wrong, see the error on console: " + error);
      });
  }

  function getSum(props) {
    let sum = 0;
    for (let i = 0; i < props.data.length; i++) {
      sum += props.data[i].price;
    }
    setRest(salary - sum);
    setTotal(sum);
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
              <Form.Select {...financesForm.register("category")}>
                <option>Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Education">Education</option>
                <option value="Eletronics">Eletronics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Home appliances">Home appliances</option>
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
            <th>Category</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price ($)</th>
            <th>Transaction date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>{item.transactionDate}</td>
              <td className="text-center">
                <ButtonGroup aria-label="Basic example">
                  <Button
                    variant="outline-primary"
                    onClick={() => showUpdateModal(item._id)}
                  >
                    <UpdateIcon />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => showDeleteModal(item._id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => showInfoModal(item._id)}
                  >
                    <InfoIcon />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"></td>
            <td colSpan="4">Total: ${total}</td>
          </tr>
        </tbody>
      </Table>
      <p>Salary: {salary}</p>
      <p>Total: ${total}</p>
      <p>Rest: {rest}</p>

      {/* Delete modal */}
      <Modal centered show={showDelete} onHide={closeDeleteModal}>
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
      {/* Update Modal */}
      <Modal show={showUpdate} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update finance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {financesByID.map((item) => (
            <Form>
              <Row className="g-2 mb-3">
                <Col md="12" sm="12" lg="12">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Transaction ID"
                  >
                    <Form.Control
                      defaultValue={item._id}
                      readOnly
                      type="description"
                      placeholder="Set the description"
                    />
                  </FloatingLabel>
                </Col>
                <Col md="12" sm="12" lg="12">
                  <FloatingLabel
                    controlId="floatingSelectGrid"
                    label="Select the category"
                  >
                    <Form.Select
                      {...updateForm.setValue("category", item.category)}
                      {...updateForm.register("category")}
                    >
                      <option>Category</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Education">Education</option>
                      <option value="Eletronics">Eletronics</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Food">Food</option>
                      <option value="Health">Health</option>
                      <option value="Home appliances">Home appliances</option>
                      <option value="Transport">Transport</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col md="12" sm="12" lg="12">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Description"
                  >
                    <Form.Control
                      {...updateForm.setValue("description", item.description)}
                      {...updateForm.register("description")}
                      type="description"
                      placeholder="Set the description"
                    />
                  </FloatingLabel>
                </Col>
                <Col md="12" sm="12" lg="12">
                  <FloatingLabel controlId="floatingInputGrid" label="Location">
                    <Form.Control
                      {...updateForm.setValue("location", item.location)}
                      {...updateForm.register("location")}
                      type="location"
                      placeholder="Set the location"
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="floatingInputGrid" label="Price">
                    <Form.Control
                      {...updateForm.setValue("price", item.price)}
                      {...updateForm.register("price")}
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
                      {...updateForm.setValue(
                        "transactionDate",
                        item.transactionDate
                      )}
                      {...updateForm.register("transactionDate")}
                      type="transactionDate"
                      placeholder="Set the transaction date"
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Form>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateFinance}>
            Update
          </Button>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info modal */}
      <Modal show={showInfo} onHide={closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Finance information</Modal.Title>
        </Modal.Header>
        {financesByID.map((item, index) => (
          <Modal.Body key={index}>
            <p>Transaction ID: {item._id}</p>
            <p>Description: {item.description}</p>
            <p>Location: {item.location}</p>
            <p>Price: ${item.price}</p>
            <p>Transaction date: {item.transactionDate}</p>
            <p>Create at: {item.createAt}</p>
          </Modal.Body>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInfoModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
