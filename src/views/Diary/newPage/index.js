import React, { useState, useEffect } from "react";
import { Container, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import diaryServices from "../../../services/diaryService";

export function NewDiaryPage() {
  const [value, setValue] = useState("Controlled");
  const [info, setInfo] = useState("");

  function onChange(ev) {
    const { text, date } = ev.target;

    setInfo({ ...info, [text]: date });
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function onSubmit() {
    diaryServices.searchDiary().then((response) => {
      console.log("Did it work!");
      console.log(response);
    });
  }

  return (
    <Container>
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        <Grid item sm={12}></Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            variant="standard"
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item sm={8}></Grid>
        <Grid item sm={12}>
          <TextField
            fullWidth
            id="outlined-multiline-flexible"
            label="Type here"
            multiline
            maxRows={30}
            value={value}
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={12}>
          <Button
            onClick={() => onSubmit()}
            color="success"
            variant="contained"
          >
            SEND
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
