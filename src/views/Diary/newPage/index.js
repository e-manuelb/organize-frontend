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
import { useNavigate } from "react-router-dom";
import { diaryModel } from "../../../models/DiaryModel";
import diaryServices from "../../../services/DiaryService";

export function NewDiaryPage() {
  const history = useNavigate();

  const navigation = (url) => {
    history.push(url);
  };

  const diaryForm = useForm({
    defaultValues: diaryModel.createDiary(),
  });

  function saveDiary() {
    const createDiary = { ...diaryForm.getValues() };
    diaryServices
      .saveDiary(createDiary)
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

  return (
    <Container>
      <Form>
        <Row className="mb-2">
          <Col sm={6} md={3}>
            <FloatingLabel controlId="floatingInputGrid" label="Date">
              <Form.Control
                {...diaryForm.register("date")}
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
                {...diaryForm.register("text")}
                as="textarea"
                rows={25}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={saveDiary}>
              Add to diary
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
