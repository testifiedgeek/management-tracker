import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../context/AppContext";
import navigate from "../../helperfunctions/navigation";
import "../Header/Header.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              this.context.state.page === "Create Project" ? (
                <ion-icon
                  onClick={() =>
                    navigate(
                      "back",
                      "/project",
                      "Projects",
                      this.props.history,
                      this.context
                    )
                  }
                  class="header_mobile_opt"
                  name="arrow-back"
                ></ion-icon>
              ) : (
                <ion-icon
                  onClick={() =>
                    navigate(
                      "push",
                      "/create-project",
                      "Create Project",
                      this.props.history,
                      this.context
                    )
                  }
                  class="header_mobile_opt"
                  name="menu-outline"
                ></ion-icon>
              )}
              <ion-icon class="header_web_opt" name="arrow-back"></ion-icon>
              <h3 className="header_buttons"> {this.context.state.page}</h3>
            </div>
            <div className="header_right">
              {this.context.state.page !== "Projects" ? (
                GenarateName({ name: this.context.state.user.name })
              ) : (
                <ion-icon
                  onClick={() =>
                    navigate(
                      "push",
                      "/create-project",
                      "Create Project",
                      this.props.history,
                      this.context
                    )
                  }
                  class="add_project_icon"
                  name="add-circle"
                ></ion-icon>
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
