import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  userSelector,
  logout,
  clearUserInfo,
  clearState,
} from "../features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  // If user exits
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // If user is not logged in
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(clearState());
    dispatch(clearUserInfo());
    dispatch(logout());
    history.push("/");
  };

  const { userInfo } = useSelector(userSelector);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/">Home</Link>
          </Typography>
          {userInfo.name && userInfo.email ? (
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5" sx={{ pt: 2 }} color="text.secondary">
                Hi! {userInfo.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Button variant="contained">
                    <Link to="/profile">Profile</Link>
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button onClick={logoutHandler} variant="contained">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="primary" size="large">
                <Link to="/register">Register</Link>
              </Button>
              <Button color="inherit" size="large">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
