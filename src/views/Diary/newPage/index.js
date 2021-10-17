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

export function NewDiaryPage() {
  const diaryForm = useForm({
    defaultValues: diaryModel.createDiary(),
  });

  function saveDiary() {
    const createDiary = { ...diaryForm.getValues() };
    diaryServices.saveDiary(createDiary).then(() => {
      console.log("Did it work!");
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
