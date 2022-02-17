import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import { BsSearch, BsTrash, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import diaryServices from "../../services/DiaryService";

export function DiaryIndex() {
  const [ID, setID] = useState();
  const [diaries, setDiaries] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  function navigateAndSet(readOrEdit, id) {
    navigate(`/diary/${readOrEdit}/${id}`);
  }

  function getDiaries() {
    diaryServices.getDiaries()
      .then((response) => {
        setDiaries(response.data.data);
      });
  }

  function deleteDiary() {
    diaryServices
      .deleteDiary(ID)
      .then(() => {
        closeDeleteModal();
        getDiaries();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console for more information: " +
          error
        );
      });
  }

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <Container>
      <Form>
        <Row className="g-2 mb-3">
          <Col md="4" sm="4" lg="4">
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Select the year"
            >
              <Form.Select>
                <option>Year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md="4" sm="4" lg="4">
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Select the month"
            >
              <Form.Select>
                <option>Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th colSpan="2">Text</th>
            <th colSpan="1" className="text-center">
              Date
            </th>
            <th colSpan="1" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {diaries.map(function (item, index) {
            return (
              <tr key={index}>
                <td
                  colSpan="2"
                  style={{
                    maxWidth: "50ch",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.text}
                </td>
                <td colSpan="1" className="text-center">
                  {item.date}
                </td>
                <td colSpan="1" className="text-center">
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="outline-primary"
                      onClick={() => navigateAndSet("read", item.id)}
                    >
                      <BsSearch />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => showDeleteModal(item.id)}
                    >
                      <BsTrash />
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => navigateAndSet("edit", item.id)}
                    >
                      <BsPencil />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Row>
        <Col className="align-self-center text-end">
          <Button variant="primary" onClick={() => navigate("/diary/new")}>
            Add to diary
          </Button>
        </Col>
      </Row>
      {/* Delete modal */}
      <Modal centered show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete diary page</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're deleting your diary page, are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteDiary}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
