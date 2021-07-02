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
    return (
      <div>
        <div>
          <RepresentData
            infodata={{
              title: "UI Design",
              startDate: "12/01/2020",
              endDate: "09/12/2021",
            }}
          />
          <div className="tabs_section">
            <span onClick={() => this.setState({ tab: "project_plan" })}>
              {this.state.tab === "project_plan" ? (
                <span className="active_project_plan">Project Plan</span>
              ) : (
                <span className="inactive_project_plan">Project Plan</span>
              )}
            </span>
            <span onClick={() => this.setState({ tab: "project_updates" })}>
              Project Updates
            </span>
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
