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
  Link as UILink,
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
            variant="h3"
            component="div"
            color="text.secondary"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <Link to="/">Home</Link>
          </Typography>
          {userInfo.name && userInfo.email ? (
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h5"
                sx={{ pt: 2, mr: 1, fontWeight: "bold" }}
                color="secondary"
              >
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
                  <Typography variant="h5">
                    <UILink component={Link} underline="none" to="/profile">
                      Profile
                    </UILink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button onClick={logoutHandler} variant="contained">
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h5"
                color="secondary"
                sx={{ fontWeight: "bold", pr: 3 }}
              >
                <Link to="/register">Register</Link>
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <Link to="/login">Login</Link>
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
