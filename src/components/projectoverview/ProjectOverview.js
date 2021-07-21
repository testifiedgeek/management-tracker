import React, { Component } from "react";
import RepresentData from "../../reusable/textinfo/textdata.js";
import Projectplan from "../projectplane/projectplan";
import Projectupdates from "../projectupdates/projectupdates";
import "./ProjectOverview.scss";

export default class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "project_plan",
    };
  }
  render() {
    var contentClass = this.props.isOpen ? "content open" : "content";
    return (
      <div className={contentClass}>
      <div>
        <div className="project_overview_container">
          <div className="represent_data">
          <RepresentData
            infodata={this.props.data}
          />
          </div>

          <div className="tabs_section">
            <span onClick={() => this.setState({ tab: "project_plan" })}>
              {this.state.tab === "project_plan" ? (
                <span className="active_project_plan">PROJECT PLANES</span>
              ) : (
                <span className="inactive_project_plan">PROJECT PLANES</span>
              )}
            </span>
            <span onClick={() => this.setState({ tab: "project_updates" })}>
              {this.state.tab === "project_updates" ? (
                <span className="active_project_plan">PROJECT UPDATES</span>
              ) : (
                <span className="inactive_project_plan">PROJECT UPDATES</span>
              )}
            </span>
          </div>
        </div>
        {/* Render Child Components on the basis of above conditions */}

        {this.state.tab === "project_plan" ? (
          <Projectplan />
        ) : (
          <Projectupdates />
        )}
      </div>
      </div>
    );
  }
}
