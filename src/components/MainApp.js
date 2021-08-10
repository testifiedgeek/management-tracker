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
import Alert from "../reusable/alert/alert";
import { Fetch_function } from "../helperfunctions/fetchdata";
import Taskplan from "./taskoverview/taskoverveiw";
import current_date from "../helperfunctions/datemodule";

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
      alert: {
        status: false,
        task: null,
        color: "",
        message: "",
        type: "",
        fun: null,
      },
      loading: false,
      projects: [],
      departments: [],
      tasks: [],
      project_overview_details: {},
      task_overview_details: {},
      members: [],
      categories: [],
      selected_department: null,
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

  // creating warning

  set_creating_warning = (status, title, information, color) => {
    this.setState({
      warning: {
        status,
        title,
        information,
        color,
      },
    });
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

  //set projects fetch for loged user

  set_projects = (projects) => {
    this.setState({ projects: [...this.state.projects, ...projects] });
  };

  //set Departments fetch for loged user

  set_departments = (departments) => {
    this.setState({ departments: [...this.state.departments, ...departments] });
  };

  //set Departments fetch for loged user

  set_tasks = (tasks) => {
    this.setState({ tasks });
  };

  //set members fetch for loged user

  set_members = (members) => {
    this.setState({ members: [...this.state.members, ...members] });
  };

  //set categories fetch for loged user

  set_categories = (categories) => {
    this.setState({ categories: [...this.state.categories, ...categories] });
  };

  //set projet overview

  setproject_overview = (project) => {
    this.setState({ project_overview_details: project });
  };

  settask_overview = (task) => {
    this.setState({ task_overview_details: task });
  };

  setDept = (id) => {
    this.setState({ selected_department: id });
  };

  accept_task = async (userId, task, fun) => {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    let api_data = {
      path: `/employee/updateTaskStatus`,
      method: "POST",
      body: {
        project_id: task.project_id,
        task_id: task.task_id,
        final_status: 1,
      },
      user_token: token,
    };
    let result = await Fetch_function(api_data);
    if (result.status) {
      if (result.data.msg === "Task status updated successfully") {
        fun(task, 1);
        let psid = ["100068986641675", "100020261664054"];
        if (psid.length !== 0) {
          psid.forEach((items) => {
            fetch("https://stormy-ridge-52108.herokuapp.com/send_message", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                id: items,
                message: `Rahul accepted the task name login form development on ${current_date} which was assigned to him on ${task.start_date}`,
              }),
            }).then((result) => {});
          });
          // setPsid([])
        }
      }
    } else {
      this.context.set_warning(
        true,
        "failed",
        result.data,
        "red",
        this.context
      );
    }
  };

  complete_task = async (userId, task, fun) => {
    console.log("fun: ", fun);
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    let api_data = {
      path: `/employee/updateTaskStatus`,
      method: "POST",
      body: {
        project_id: task.project_id,
        task_id: task.task_id,
        final_status: 2,
      },
      user_token: token,
    };
    let result = await Fetch_function(api_data);
    if (result.status) {
      if (result.data.msg === "Task status updated successfully") {
        fun(task, 2);
        let psid = ["100068986641675", "100020261664054"];
        if (psid.length !== 0) {
          psid.forEach((items) => {
            fetch("https://stormy-ridge-52108.herokuapp.com/send_message", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                id: items,
                message: `Testing. Rahul Completed the task name login form development on ${current_date} which was assigned to him on ${task.start_date}`,
              }),
            }).then((result) => {});
          });
          // setPsid([])
        }
      }
    } else {
      this.context.set_warning(
        true,
        "failed",
        "Something Went Wrong",
        "red",
        this.context
      );
    }
  };

  logoutClicked = () => {
    this.setState({
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
      projects: [],
      departments: [],
      tasks: [],
      project_overview_details: {},
      task_overview_details: {},
      members: [],
      categories: [],
      selected_department: null,
    });
  };

  displayAlert = (task, messsage, fun, type, color, status) => {
    this.setState({
      alert: {
        status: status,
        task: task,
        message: messsage,
        fun,
        type,
        color,
      },
    });
  };

  async componentDidMount() {
    let sessiondata = await window.localStorage.getItem("sessiondata");
    if (sessiondata) {
      this.setState(JSON.parse(sessiondata));
    }

    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    if (token) {
      let api_data4 = {
        path: "/employee/getUser/",
        method: "GET",
        user_token: token,
      };
      let result4 = await Fetch_function(api_data4);
      if (result4.status) {
        if (result4.data.data.length !== 0) {
          this.set_members(result4.data.data);
          this.setState({ page: this.state.page });
        }
      }
    } else {
      this.setState({ page: "Login" });
    }
  }

  async componentDidUpdate() {
    console.log("updated");
    await window.localStorage.setItem(
      "sessiondata",
      JSON.stringify(this.state)
    );
  }

  render() {
    return (
      <div>
        <div className="App">
          {/* Global Warning Component */}
          {/* {this.state.warning.status === true ? (
            <WarningPanel
              title={this.state.warning.title}
              color={this.state.warning.color}
              information={this.state.warning.information}
            />
          ) : (
            <div></div>
          )} */}

          {this.state.alert.status === true ? (
            <Alert
              fun={this.state.alert.fun}
              color={this.state.alert.color}
              message={this.state.alert.message}
              type={this.state.alert.type}
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
              set_projects: this.set_projects,
              set_members: this.set_members,
              set_departments: this.set_departments,
              set_tasks: this.set_tasks,
              set_categories: this.set_categories,
              set_creating_warning: this.set_creating_warning,
              setproject_overview: this.setproject_overview,
              settask_overview: this.settask_overview,
              setDept: this.setDept,
              logoutClicked: this.logoutClicked,
              displayAlert: this.displayAlert,
              accept_task: this.accept_task,
              complete_task: this.complete_task,
            }}
          >
            <BrowserRouter>
              {this.state.warning.status === true ? (
                <WarningPanel
                  title={this.state.warning.title}
                  color={this.state.warning.color}
                  information={this.state.warning.information}
                />
              ) : (
                <div></div>
              )}
              <div>
                {this.state.page === "Login" ? (
                  <Switch>
                    <Route path="/login" component={Login} exact />
                  </Switch>
                ) : (
                  <div className="grid_container">
                    <div className="header">
                      <Header />
                    </div>
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
                          <Route
                            path="/task-overview"
                            component={Taskplan}
                            exact
                          />
                          <Route
                            path="/display-group"
                            component={DisplayGroup}
                            exact
                          />
                          <Route
                            path="/dashboard"
                            component={Dashboard}
                            exact
                          />
                          <Route path="/" component={Dashboard} exact />
                          <Route path="/profile" component={Profile} exact />
                          <Route
                            path="/write-update"
                            component={Put_Updates}
                            exact
                          />
                          <Route
                            path="/workspace"
                            component={Workspace}
                            exact
                          />
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
                          <Route path="/task" component={DisplayGroup} exact />
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
