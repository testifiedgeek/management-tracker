import React, { Component } from "react";
import "../scss/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "../components/Login";
import Projects from "../components/Projects";
import ProjectOverview from "./projectoverview/ProjectOverview";
import ForgotPassword from "../components/ForgotPassword";
import CreateNewTask from "../reusable/createtask";
import TaskDetails from "../components/TaskDetails";
import WorkspaceSelection from "../components/WorkspaceSelection";
import AppContext from "../context/AppContext";
import SideBar from "../reusable/SideBar";
import Header from "../reusable/Header";
import ShowStats from "../reusable/statisticsData/statisticsCircle";
import RepresentData from "../reusable/textinfo/textdata.js";
import Infoboxes from "../reusable/infoboxes/infoboxes";

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dashboard",
    };
  }

  render() {
    return (
      <div>
        <div className="App">
          <div>
            <BrowserRouter>
              <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/projects" component={Projects} exact />
                <Route
                  path="/login/forgot-password"
                  component={ForgotPassword}
                  exact
                />
                <Route
                  path="/project-overview"
                  component={ProjectOverview}
                  exact
                />
                <Route path="/dashboard" component={Dashboard} exact />
                <Route
                  path="/create-new-task"
                  component={CreateNewTask}
                  exact
                />
                <Route path="/task-details" component={TaskDetails} exact />
                <Route
                  path="/login/workspace-selection"
                  component={WorkspaceSelection}
                  exact
                />
                <Route component={Error} exact />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}
