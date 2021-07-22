import React, { Component } from "react";
import "../Sidebar/SideBar.scss";
import AppContext from "../../context/AppContext";
import { withRouter } from "react-router-dom";
import navigate from "../../helperfunctions/navigation";
import GenarateName from "../namecirclegenerator/criclegenrator";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutClicked(context) {
    navigate("push", "/", "", this.props.history, this.context);
    this.context.updateLoginStatus(false);
  }

  dashboardClicked() {
    navigate(
      "push",
      "/dashboard",
      "Dashboard",
      this.props.history,
      this.context
    );
  }

  projectsClicked() {
    navigate("push", "/projects", "Projects", this.props.history, this.context);
  }

  workspaceClicked() {
    navigate(
      "push",
      "/workspace",
      "Workspace",
      this.props.history,
      this.context
    );
  }

  settingClicked() {
    navigate("push", "/settings", "Settings", this.props.history, this.context);
  }

  render() {
    return (
      <div id="slide">
        <AppContext.Consumer>
          {(context) => (
            <React.Fragment>
              <div className="Sidebar_webview">
                <div className="logo_container">
                  <img
                    className="logo"
                    src={process.env.PUBLIC_URL + "/HDFC ERGO LOGO - RED.jpg"}
                    alt=""
                  />
                </div>
                <div className="sidebar_items">
                  <div>
                    <div className="sidebar_top">
                      <div
                        className="sidebar_buttons"
                        onClick={() => this.dashboardClicked()}
                      >
                        <ion-icon name="home"></ion-icon> Dashboard
                      </div>
                      <div
                        className="sidebar_buttons"
                        onClick={() => this.projectsClicked()}
                      >
                        <ion-icon name="copy"></ion-icon> Projects
                      </div>
                      <div
                        className="sidebar_buttons"
                        onClick={() => this.workspaceClicked()}
                      >
                        <ion-icon name="mail"></ion-icon> Workspace
                      </div>
                    </div>
                    <div className="sidebar_bottom">
                      <div
                        className="sidebar_buttons"
                        onClick={() => this.logoutClicked(context)}
                      >
                        <ion-icon name="log-out"></ion-icon> Logout
                      </div>
                      <div
                        className="sidebar_buttons"
                        onClick={() => this.settingClicked()}
                      >
                        <ion-icon name="settings"></ion-icon> Settings
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Sidebar_mobileview">
                <div className="Sidebar_submobileview">
                  {this.context.state.page === "Dashboard" ? (
                    <div className="sidebar_buttons">
                      <div>
                        <ion-icon name="home"></ion-icon>
                      </div>
                      <label>Dashboard</label>
                    </div>
                  ) : (
                    <div
                      className="inactive_sidebar_buttons"
                      onClick={() => this.dashboardClicked()}
                    >
                      <ion-icon name="home"></ion-icon>
                    </div>
                  )}

                  {this.context.state.page === "Projects" ? (
                    <div className="sidebar_buttons">
                      <div>
                        <ion-icon name="receipt"></ion-icon>
                      </div>
                      <label>Projects</label>
                    </div>
                  ) : (
                    <div
                      className="inactive_sidebar_buttons"
                      onClick={() => this.projectsClicked()}
                    >
                      <ion-icon name="receipt"></ion-icon>
                    </div>
                  )}
                  {this.context.state.page === "Workspace" ? (
                    <div className="sidebar_buttons">
                      <div>
                        <ion-icon name="calendar"></ion-icon>
                      </div>
                      <label>Workspace</label>
                    </div>
                  ) : (
                    <div
                      className="inactive_sidebar_buttons"
                      onClick={() => this.workspaceClicked()}
                    >
                      <ion-icon name="calendar"></ion-icon>
                    </div>
                  )}
                  <div
                    onClick={() =>
                      navigate(
                        "push",
                        "/profile",
                        "Profile",
                        this.props.history,
                        this.context
                      )
                    }
                  >
                    {GenarateName({ name: this.context.state.user.name })}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

Sidebar.contextType = AppContext;

export default withRouter(Sidebar);
