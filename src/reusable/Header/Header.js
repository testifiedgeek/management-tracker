import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../context/AppContext";
import navigate from "../../helperfunctions/navigation";
import "../Header/Header.scss";
import { GenarateName } from "../namecirclegenerator/criclegenrator";
import Button from "../../reusable/button/button";
import Createprocess_icon from "../../reusable/createprocess_icons/createprocessicon";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backpage: "",
    };
  }

  render() {
    console.log("context: ", this.context, this.props.history);
    return (
      <div id="slide">
        <React.Fragment>
          <div className="subheader">
            <div className="header_left">
              {this.context.state.page === "Project Overview" ||
              this.context.state.page === "Profile" ||
              this.context.state.page === "Create Project" ||
              this.context.state.page === "Create Space" ||
              this.context.state.page === "Create Task" ||
              this.context.state.page === "Write Update" ||
              this.context.state.page === "Create Workspace" ? (
                <ion-icon
                  onClick={() =>
                    navigate(
                      "back",
                      "/project",
                      this.context.state.backpage,
                      this.props.history,
                      this.context
                    )
                  }
                  class="header_web_opt"
                  name="arrow-back"
                ></ion-icon>
              ) : (
                <div></div>
              )}

              <h3 className="header_buttons">
                {" "}
                {this.context.state.page === "Departments"
                  ? this.context.state.selected_department.work_place_name
                  : this.context.state.page}
              </h3>
            </div>
            <div className="header_right">
              {this.context.state.page === "Departments" ? (
                <Button
                  fun={() =>
                    navigate(
                      "push",
                      "/create-project",
                      "Create Project",
                      this.props.history,
                      this.context
                    )
                  }
                  title="Create Project"
                  color="inherit"
                  width="100%"
                />
              ) : this.context.state.page === "Workspace" ? (
                <Button
                  fun={() =>
                    navigate(
                      "push",
                      "/create-space",
                      "Create Space",
                      this.props.history,
                      this.context
                    )
                  }
                  title="Create Space"
                  color="inherit"
                  width="100%"
                />
              ) : (
                <div></div>
              )}
              {this.context.state.page !== "Projects" &&
              this.context.state.page !== "Project Overview" &&
              this.context.state.page !== "Write Update" ? (
                <div class="header_web_opt">
                  <GenarateName name={this.context.state.user.name} />
                </div>
              ) : (
                <div>
                  {this.context.state.page === "Projects" ? (
                    Createprocess_icon("Create Project", {
                      state: "push",
                      path: "/create-project",
                      page: "Create Project",
                      history: this.props.history,
                      context: this.context,
                    })
                  ) : this.context.state.page === "Project Overview" &&
                    parseInt(this.context.state.user.employeeid) ===
                      parseInt(
                        this.context.state.project_overview_details.created_by
                      ) ? (
                    Createprocess_icon("Create Task", {
                      state: "push",
                      path: "/create-task",
                      page: "Create Task",
                      history: this.props.history,
                      context: this.context,
                    })
                  ) : this.context.state.page === "Write Update" ? (
                    Createprocess_icon("Write Update", {
                      state: "push",
                      path: "/write-update",
                      page: "Write Update",
                      history: this.props.history,
                      context: this.context,
                    })
                  ) : this.context.state.page === "Workspace" ? (
                    Createprocess_icon("Create Workspace", {
                      state: "push",
                      path: "/create-group",
                      page: "Create Workspace",
                      history: this.props.history,
                      context: this.context,
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
              {/* <h6>{this.context.state.user.name}</h6> */}
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

Header.contextType = AppContext;

export default withRouter(Header);
