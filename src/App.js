import './scss/App.scss';
import './App.css';
import './index.css';
import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import MainApp from './components/MainApp';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Projects from './components/Projects';
// import ProjectOverview from './components/ProjectOverview';
// import ForgotPassword from './components/ForgotPassword';
// import CreateNewTask from './components/CreateNewTask';
// import TaskDetails from './components/TaskDetails';
// import WorkspaceSelection from './components/WorkspaceSelection';



function App() {
  return (
    <div>
      
      {/* <div className="App">

        <BrowserRouter>
          <MainApp>
            <Switch>
              <Route path="/" component={Login} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/login/forgot-password" component={ForgotPassword} exact />
              <Route path="/project-overview" component={ProjectOverview} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/create-new-task" component={CreateNewTask} exact />
              <Route path="/task-details" component={TaskDetails} exact />
              <Route path="/login/workspace-selection" component={WorkspaceSelection} exact />
              <Route component={Error} exact />
            </Switch>
            </MainApp>
        </BrowserRouter>

      </div> */}

    </div>
  );
}

export default App;
