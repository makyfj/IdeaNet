import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Idea from "./pages/Idea";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" component={Home} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/ideas/:id" component={Idea}></Route>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
