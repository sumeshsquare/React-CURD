import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFlows from "./components/add-flows.component";
import Flows from "./components/flows.component";
import FlowsList from "./components/flows-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/flows"} className="navbar-brand">
            File Mapper
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Flow
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/flows"]} component={FlowsList} />
            <Route exact path="/add" component={AddFlows} />
            <Route path="/flows/:id" component={Flows} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
