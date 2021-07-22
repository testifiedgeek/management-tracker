import React, { Component } from "react";
import "../scss/App.scss";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Projects from "./Projects/Projects";
import ProjectOverview from "./projectoverview/ProjectOverview";
import ForgotPassword from "../components/ForgotPassword";
import TaskDetails from "../components/TaskDetails";
import WorkspaceSelection from "./workspace/WorkspaceSelection";
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
import Put_Updates from "../reusable/putupdates/updates";
import Workspace from "./workspace/WorkspaceSelection";
import Createtask from "./createtasks/createtasks";
import Creategroups from "./creategroups/creategropus";
import DisplayGroup from "./DisplayGroup/displayGroup";
import WarningPanel from "../../src/reusable/warning/warning";

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Login",
      backpage: "",
      user: {
        name: "Dwarka Tiwari",
        email: "dwarka@gmail.com",
        profession: "AVP Head",
        employeeid: "142743",
      },
      warning: {
        status: false,
        information: "wdwf",
        color: "",
        title: "",
      },
      loading: false,
    };
  }

  set_page = (page) => {
    this.setState({ page });
  };

  set_backpage = (page) => {
    console.log("backpage: ", page);
    this.setState({ backpage: page });
  };

  set_warning = (status, title, information, color) => {
    this.setState({
      warning: {
        status,
        title,
        information,
        color,
      },
    });

    setTimeout(() => {
      this.setState({
        warning: {
          status: "",
          title: "",
          information: "",
          color: "",
        },
      });
    }, 3000);
  };

  set_user_details = (details) => {
    if (details) {
      this.setState({
        user: details,
      });
    }
  };

  global_fun_for_loading = (state, msg) => {
    this.setState({ loading: state });
  };

  async componentDidMount() {
    let token = window.localStorage.getItem("hdfcmanagementtracker");
    if (token) {
      <Redirect to="/dashboard" />;
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          {/* Global Warning Component */}
          {this.state.warning.status === true ? (
            <WarningPanel
              title={this.state.warning.title}
              color={this.state.warning.color}
              information={this.state.warning.information}
            />
          ) : (
            <div></div>
          )}

          {/* // Routes for Application */}
          <AppContext.Provider
            value={{
              state: this.state,
              set_page: this.set_page,
              set_backpage: this.set_backpage,
              updateLoginStatus: this.updateLoginStatus,
              set_warning: this.set_warning,
              set_user_details: this.set_user_details,
            }}
          >
            <BrowserRouter>
              <div>
                <div className="grid_container">
                  {this.state.page !== "Login" ? (
                    <div className="header">
                      <Header />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {this.state.loading === false ? (
                    <div className="main">
                      <Switch>
                        <Route path="/login" component={Login} exact />
                        <Route path="/projects" component={Projects} exact />
                        <Route
                          path="/project-overview"
                          component={ProjectOverview}
                          exact
                        />
                        <Route path="/dashboard" component={Dashboard} exact />
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/profile" component={Profile} exact />
                        <Route
                          path="/write-update"
                          component={Put_Updates}
                          exact
                        />
                        <Route path="/workspace" component={Workspace} exact />
                        <Route
                          path="/create-project"
                          component={Createproject}
                          exact
                        />
                        <Route
                          path="/create-task"
                          component={Createtask}
                          exact
                        />
                        <Route
                          path="/create-group"
                          component={Creategroups}
                          exact
                        />
                        <Route path="/group" component={DisplayGroup} exact />
                      </Switch>
                    </div>
                  ) : (
                    <div className="main">
                      <Loading />
                    </div>
                  )}
                  {this.state.page !== "Login" ? (
                    <div className="menu">
                      <SideBar />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </BrowserRouter>
          </AppContext.Provider>
        </div>
      </div>
    );
  }
}
