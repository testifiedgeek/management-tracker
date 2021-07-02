import React, { Component } from "react";
import "../scss/App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../reusable/Header";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Projects from "./components/Projects";
// import ProjectOverview from "./components/ProjectOverview";
// import ForgotPassword from "./components/ForgotPassword";
// import TaskDetails from "./components/TaskDetails";
// import WorkspaceSelection from "./components/WorkspaceSelection";
// import AppContext from "../context/AppContext";
import Sidebar from "../reusable/Sidebar";
import TableContent from '../reusable/table';
import CreateNewTask from "../reusable/createtask";

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    
        <div className="trial">

    <div className="sidebar">

          <Sidebar />
    </div>
   
        <div className="header-main">

          <Header />
        </div>     
          <TableContent title={['first', 'second', 'third', 'fourth']} content= {[{key1: "value1", key2: "value2", key3: "value3", key4: "value4"},{key1: "value11", key2: "value22",  key3: "value33", key4: "value44"},{key1: "value111", key2: "value222", key3: "value333", key4: "value444"}]} />
         <div>
           <CreateNewTask />
         </div>
          
        </div>
    
          
      // <AppContext.Provider value={{}}>
      //   <div>
      //     <SideBar />

      //     <div>
      //       {/* Header */}
      //       <Header title={this.state.title} />
      //       <div className="App">
      //         <div>
      //           <Switch>
      //             <Route path="/" component={Login} exact />
      //             <Route path="/login" component={Login} exact />
      //             <Route path="/projects" component={Projects} exact />
      //             <Route
      //               path="/login/forgot-password"
      //               component={ForgotPassword}
      //               exact
      //             />
      //             <Route
      //               path="/project-overview"
      //               component={ProjectOverview}
      //               exact
      //             />
      //             <Route path="/dashboard" component={Dashboard} exact />
      //             <Route
      //               path="/create-new-task"
      //               component={CreateNewTask}
      //               exact
      //             />
      //             <Route path="/task-details" component={TaskDetails} exact />
      //             <Route
      //               path="/login/workspace-selection"
      //               component={WorkspaceSelection}
      //               exact
      //             />
      //             <Route component={Error} exact />
      //           </Switch>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </AppContext.Provider>
    );
  }
}
