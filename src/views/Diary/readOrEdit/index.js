import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { diaryModel } from "../../../models/diaryModel";
import diaryServices from "../../../services/diaryService";
import { useHistory } from "react-router";

export function ReadOrEditIndex(props) {
  const ID = props.match.params.id;
  const readOrEdit = props.match.params.readOrEdit;
  const [content, setContent] = useState([]);
  const [readOnly, setReadOnly] = useState();
  const [saveEnabled, setSaveEnabled] = useState();
  const [editEnabled, setEditEnabled] = useState();

  function setCase() {
    if (readOrEdit === "read") {
      setReadOnly(true);
      setEditEnabled(false);
      setSaveEnabled(true);
    } else {
      setReadOnly(false);
      setEditEnabled(true);
      setSaveEnabled(false);
    }
  }

  const history = useHistory();

  const navigation = (url) => {
    history.push(url);
  };

  const diaryForm = useForm({
    defaultValues: diaryModel.createDiary(),
  });

  function searchDiary() {
    diaryServices
      .searchDiary(ID)
      .then((response) => {
        console.log("Did it work!");
        setContent([response.data]);
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console for more information: " +
            error
        );
      });
  }

  function updateDiary() {
    const updateDiary = { ...diaryForm.getValues() };
    diaryServices
      .updateDiary(ID, updateDiary)
      .then(() => {
        console.log("Did it work!");
        navigation("/diary");
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console for more information: " +
            error
        );
      });
  }

  useEffect(() => {
    setCase();
    searchDiary();
  }, []);

  return (
    <Container>
      {content.map((item) => (
        <Form>
          <Row className="mb-2">
            <Col sm={6} md={3}>
              <FloatingLabel controlId="floatingInputGrid" label="Date">
                <Form.Control
                  {...diaryForm.setValue("date", item.date)}
                  {...diaryForm.register("date")}
                  readOnly={readOnly}
                  type="date"
                  placeholder="Set the date"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Type here</Form.Label>
                <Form.Control
                  {...diaryForm.setValue("text", item.text)}
                  {...diaryForm.register("text")}
                  readOnly={readOnly}
                  as="textarea"
                  rows={25}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={11} className="p-1">
              <Button
                variant="dark"
                onClick={() => navigation("/diary/")}
                className="mx-2"
              >
                Back
              </Button>
              <Button
                variant="primary"
                disabled={editEnabled}
                onClick={function edit() {
                  setSaveEnabled(false);
                  setReadOnly(false);
                  setEditEnabled(true);
                }}
              >
                Edit
              </Button>
            </Col>
            <Col sm={1} lg={1} md={1} className="p-1">
              <Button
                className="mx-2"
                variant="success"
                onClick={updateDiary}
                disabled={saveEnabled}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      ))}
    </Container>
  );
}
