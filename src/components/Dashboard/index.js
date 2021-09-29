import React from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Drawer } from "@mui/material";
import { dashboardStyles } from "./dashboardStyles";
import HomeIcon from "@mui/icons-material/Home";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Divider } from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import { useHistory } from "react-router";

export function Dashboard(props) {
  const classes = dashboardStyles();
  const history = useHistory();

  const navigation = (url) => {
    history.push(url);
  };

  return (
    <div>
      <Container maxWidth>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawerMenu}
        >
          <Toolbar>
            <div>
              <div>
                <InputLabel
                  style={{
                    color: "#2da14c",
                    fontFamily: "ubuntu",
                    fontSize: "20px",
                    padding: "20px",
                  }}
                >
                  ORGANIZE
                </InputLabel>
              </div>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigation("/")}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigation("/register")}>
                    <ListItemIcon>
                      <TableViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Finances" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </Toolbar>
        </Drawer>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" style={{ background: "green" }}>
            <Toolbar></Toolbar>
          </AppBar>
        </Box>
        <div>{props.children}</div>
      </Container>
    </div>
  );
}
