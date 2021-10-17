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
} from "react-bootstrap";
import { useHistory } from "react-router";
import diaryServices from "../../services/diaryService";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export function DiaryIndex() {
  const history = useHistory();
  const [diaries, setDiaries] = useState([]);

  const navigation = (url) => {
    history.push(url);
  };

  function getDiaries() {
    diaryServices.getDiaries().then((response) => {
      setDiaries(response.data);
      console.log(diaries);
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
          {diaries.map((item) => (
            <tr>
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
                    // onClick={() => showUpdateModal(item._id)}
                  >
                    <FindInPageIcon />
                  </Button>
                  <Button
                    variant="outline-danger"
                    // onClick={() => showDeleteModal(item._id)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="outline-warning"
                    // onClick={() => showInfoModal(item._id)}
                  >
                    <CreateIcon />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col className="align-self-center text-end">
          <Button variant="primary" onClick={() => navigation("/diary/new")}>
            Add to diary
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
