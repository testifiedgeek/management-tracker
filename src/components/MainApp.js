import React, { Component } from "react";
import "../scss/App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from '../components/Login/Login'
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

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Dashboard",
      backpage: "",
      user: {
        name: "Dwarka Tiwari",
        email: "dwarka@gmail.com",
        profession: "AVP Head",
        employeeid: "142743",
      },
      loading: false,
      isLogin: false,
    };
  }

  set_page = (page) => {
    this.setState({ page });
  };

  set_backpage = (page) => {
    console.log("backpage: ", page);
    this.setState({ backpage: page });
  };

  global_fun_for_loading = (state, msg) => {
    this.setState({ loading: state });
  };

  updateLoginStatus = (status) => {
    this.setState({isLogin: status});
  }

  render() {
    return (
      <div>
        <div className="App">
          <AppContext.Provider
            value={{
              state: this.state,
              set_page: this.set_page,
              set_backpage: this.set_backpage,
              updateLoginStatus:this.updateLoginStatus
            }}
          >
            <BrowserRouter>
              <div >
              {this.state.isLogin === false ? (<div>
                <Switch>
                  <Route path="" component={Login} exact />
                </Switch>
              </div>):(<div className="grid_container">
                
                <div className="header">
                  <Header />
                </div>
                {this.state.loading === false ? (
                  <div className="main">
                    <Switch>
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
                      <Route path="/create-task" component={Createtask} exact />
                      <Route
                        path="/create-group"
                        component={Creategroups}
                        exact
                      />
                      <Route
                      path="/group"
                      component={DisplayGroup}
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
              )}
              
              </div>
            </BrowserRouter>
          </AppContext.Provider>
        </div>
      </div>
    );
  }
}
