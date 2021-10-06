import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { useHistory } from "react-router";
export function DiaryIndex() {
  const history = useHistory();

  const navigation = (url) => {
    history.push(url);
  };
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Year
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={year}
              onChange={handleChangeYear}
              autoWidth
              label="Year"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={3} xs={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Month
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={month}
              onChange={handleChangeMonth}
              autoWidth
              label="Month"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} xs={12}>
          <InputLabel style={{ textAlign: "center" }}>
            Diaries per day
          </InputLabel>
        </Grid>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item sm={6} xs={6}>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigation("/diary/new")}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
