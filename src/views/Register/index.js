import React from "react";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { registerStyles } from "./registerStyles";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";

export function RegisterIndex() {
  const classes = registerStyles();
  return (
    <div className={classes.divRegister}>
      <Container
        maxWidth="xs"
        className={classes.containerRegister}
        style={{ textAlign: "center" }}
      >
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <InputLabel
              style={{
                color: "#2da14c",
                fontFamily: "ubuntu",
                fontSize: "30px",
              }}
            >
              ORGANIZE
            </InputLabel>
          </Grid>
          <Grid item sm={12} />
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="Name:"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="E-mail:"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              size="small"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12} />
          <Grid item sm={12}>
            <Button variant="contained" style={{ background: "#2da14c" }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
