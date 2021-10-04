import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import Footer from "../components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <Box sx={{ width: "100%", height: "100vh", minHeight: "100vh" }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;
