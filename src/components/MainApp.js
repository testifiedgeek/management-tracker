import React, { Component } from "react";
import "../scss/App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TableContent from "../reusable/table";
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
import Profile from "./Profile/Profile";
import Createproject from "./createproject/Createproject";
import Loading from "../reusable/loading/loading";
import SideDrawer from "../reusable/SideDrawer/SideDrawer";

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Dashboard",
      user: {
        name: "Dwarka Tiwari",
        email: "dwarka@gmail.com",
        profession: "AVP Head",
        employeeid: "142743",
      },
      loading: false,
    };
  }

  set_page = (page) => {
    this.setState({ page });
  };

  global_fun_for_loading = (state, msg) => {
    this.setState({ loading: state });
  };

  render() {
    return (
      <div>
        <div className="App">
          <AppContext.Provider
            value={{
              state: this.state,
              set_page: this.set_page,
            }}
          >
            <BrowserRouter>
              <div className="grid_container">
                <div className="header">
                  <Header />
                </div>
                {this.state.loading === false ? (
                  <div className="main">
                    <Switch>
                      <Route path="/projects" component={Projects} exact />
                      <Route
                        path="/workspace"
                        component={SideDrawer}
                        exact
                      />
                      <Route path="/dashboard" component={Dashboard} exact />
                      <Route path="/profile" component={Profile} exact />
                      <Route
                        path="/create-project"
                        component={Createproject}
                        exact
                      />
                    </Switch>
                  </div>
                ) : (
                  <div className="main">
                    <Loading />
                  </div>
                )}
                <div className="menu">
                  <SideBar />
                </div>
              </div>
            </BrowserRouter>
          </AppContext.Provider>
        </div>
      </div>
    );
  }
}
