import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import "react-confirm-alert/src/react-confirm-alert.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { API } from "../constants/global";

const columns = [
  { id: "_id", label: "id", minWidth: 170 },
  { id: "place", label: "Place", minWidth: 150 },
  { id: "action", label: "action", minWidth: 100 },
];

function AdminPanal() {
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [details, setDetails] = useState();
  const getUsers = async (place) => {
    const { data } = await axios.get(`${API}/users/${place}`);
    setDetails(data.data);
  };
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fethPlaces = async () => {
      // /places
      const { data } = await axios.get(`${API}/places`);

      setPlaces(data.places);
    };
    fethPlaces();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Admin panal
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Admin panal
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Admin panal">
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    alt={"A"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpNXCt-jDVzB_Gjw0QwfLM9iV2xfd3yzUvew&usqp=CAU"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              ></Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <h1 align="center">Place & Users List</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Paper
          sx={{ display: "inline-block", width: "50%", overflow: "hidden" }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {places
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell>{row._id}</TableCell>
                        <TableCell>{row.place}</TableCell>
                        <TableCell>
                          <button
                            onClick={() => {
                              getUsers(row.place);
                            }}
                          >
                            view users
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={places.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box>
          {" "}
          {details && (
            <>
              <strong>{details.place}</strong>
              <br />
              <ol>
                {details.users.map((user) => {
                  return <li key={user._id}> {user.userName}</li>;
                })}
              </ol>
              {details.users.length===0 ? "no users in this place" :""}
            </>
          )}{" "}
        </Box>
      </div>
    </>
  );
}

export default AdminPanal;
