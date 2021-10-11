import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { TablePaginationActions } from "./tablePagination";
import financesServices from "../../services/financesService";

export function FinancesIndex() {
  const [category, setCategory] = useState("");
  const [finances, setFinances] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - finances.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function getFinances() {
    financesServices
      .searchFinances()
      .then((response) => {
        setFinances(response.data.finances);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });
  }

  useEffect(() => {
    getFinances();
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item sm={3} xs={3}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={category}
              onChange={handleChange}
              autoWidth
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Food</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={9} xs={9}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Description"
            variant="standard"
          />
        </Grid>
        <Grid item sm={3} xs={3}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Price"
            variant="standard"
          />
        </Grid>
        <Grid item sm={2} xs={2}>
          <TextField
            fullWidth
            variant="standard"
            id="date"
            label="Transaction date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Location"
            variant="standard"
          />
        </Grid>
        <Grid item sm={1} xs={1}>
          <Button fullWidth color="success" variant="contained">
            Save
          </Button>
        </Grid>
        <Grid item sm={12} xs={12}>
          <InputLabel style={{ textAlign: "center" }}>
            Monthly expenses
          </InputLabel>
        </Grid>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>
                Transaction date
              </TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Create At</TableCell>
            </TableRow>
          </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? finances.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : finances
                ).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.category}
                    </TableCell>
                    <TableCell>
                      {item.description}
                    </TableCell>
                    <TableCell>
                      {item.price}
                    </TableCell>
                    <TableCell>
                      {item.transactionDate}
                    </TableCell>
                    <TableCell>
                      {item.location}
                    </TableCell>
                    <TableCell>
                      {item.createAt}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={finances.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
