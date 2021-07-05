import React, { Component } from "react";
import "../scss/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TableContent from '../reusable/table';
import CreateNewTask from "../reusable/createtask";
import Dashboard from "./Dashboard/Dashboard";
import Login from "../components/Login";
import Projects from "./Projects/Projects";
import ProjectOverview from "./projectoverview/ProjectOverview";
import ForgotPassword from "../components/ForgotPassword";
import TaskDetails from "../components/TaskDetails";
import WorkspaceSelection from "../components/WorkspaceSelection";
import AppContext from "../context/AppContext";
import SideBar from "../reusable/Sidebar/SideBar";
import Header from "../reusable/Header/Header";
import ShowStats from "../reusable/statisticsData/statisticsCircle";
import RepresentData from "../reusable/textinfo/textdata.js";
import Infoboxes from "../reusable/infoboxes/infoboxes";
import CommentBox from "../reusable/CommentBox/comments";


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
            <Route render={() => <SideBar />} />
            <Route render={() => <Header title={this.state.title}/>} />
          
              <Switch>
                {/* <Route path="/" component={Login} exact />
                <Route path="/login" component={Login} exact /> */}
                <Route path="/projects" component={Projects} exact />
                {/* <Route
                  path="/login/forgot-password"
                  component={ForgotPassword}
                  exact
                /> */}
                <Route
                  path="/project-overview"
                  component={ProjectOverview}
                  exact
                />
                <Route path="/dashboard" component={Dashboard} exact />
                {/* <Route
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
                <Route component={Error} exact /> */}
              </Switch>
            </BrowserRouter>
          </div>
        </div> 
      </div>
    );
  }
}
