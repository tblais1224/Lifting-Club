import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section>
        <Switch>
          <Route exact poth="/register" component={Register}/>
          <Route exact poth="/login" component={Login}/>
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
