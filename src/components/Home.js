import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { UserLogout } from "../actions/User";
import { Button, ImageListItemBar, TextField } from "@mui/material";
import axios from "axios";
import { API } from "../constants/global";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
const settings = ["Logout"];

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { userInfo, loading } = useSelector((state) => state.userInfo);

  const [image, setImage] = useState("");
  const [imageprivew, setimageprivew] = useState("");
  const [itemData, setItemData] = useState([]);
  
  

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      const fetchImgs = async () => {
        let token = userInfo.token;
    
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(API, config);
        setItemData(data.images);
      };
      fetchImgs();
    }
  }, [userInfo, loading, navigate, image, imageprivew]);
  const handleSideBar = (element) => {
    if (element === "Logout") {
      dispatch(UserLogout());
      navigate("/login");
    }
  };

  const previewFileImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimageprivew(reader.result);
    };
  };
  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "image") {
      const file = event.target.files[0];
      previewFileImage(file);
      setImage(value);
    }
  };

  const clear = () => {
    setimageprivew("");
    setImage("");
  };

  const submit = async () => {
    if (!imageprivew && image) {
      alert("no image for upload please choose an image");
    } else {
      const path = image;
      const [extension] = path.split(".").reverse();
      console.log("namePartsnameParts", extension);
      let token = userInfo.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API}/upload`,
        { image: imageprivew, ext: extension },
        config
      );

      if (!data.status) {
        alert("Something Wrong...");
      } else if (data.status) {
        clear();
      }
    }
  };
  

  const deleteImg = async (key, id) => {
   
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={async() => {
                
                 
                let token = userInfo.token;
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
            
                const { data } = await axios.delete(
                  `${API}/delete-img/?imgKey=${key}&id=${id}`,
                  config
                );
               
                if (data.status) {
                 
                    let token = userInfo.token;
                
                    const config = {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    };
                    const { data } = await axios.get(API, config);
                    setItemData(data.images);
                    onClose();
                }
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });

    
  };

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
              {userInfo && userInfo.userName && userInfo.userName}
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
              {userInfo && userInfo.userName && userInfo.userName}
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={
                      userInfo &&
                      userInfo.userName &&
                      userInfo.userName.toUpperCase()
                    }
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleSideBar(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <h1 align="center">Image Gallary</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ ml: 10 }}
          id="file"
          label="IMAGE"
          type="file"
          name="image"
          value={image}
          // className={classes.root}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={inputEvent}
        />

        {imageprivew && (
          <img
            src={imageprivew}
            alt="chosen"
            style={{ width: "100px", marginLeft: 30 }}
          />
        )}

        {imageprivew && (
          <>
            <Button
              sx={{ marginLeft: 3, backgroundColor: "green" }}
              variant="contained"
              onClick={submit}
            >
              Upload
            </Button>
            <Button
              onClick={clear}
              sx={{ marginLeft: 3, backgroundColor: "red" }}
              variant="contained"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      <ImageList sx={{ width: "100wh" }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.link} sx={{ m: 6 }}>
            <img
              src={`${item.link}`}
              srcSet={`${item.link}`}
              alt={"img"}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <>
                 

                  <IconButton
                    onClick={() => {
                      deleteImg(item.img_key, item._id);
                    }}
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default Home;
