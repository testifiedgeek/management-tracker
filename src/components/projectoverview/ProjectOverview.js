import React, { Component } from "react";
import RepresentData from "../../reusable/textinfo/textdata.js";
import Projectplan from "../projectplane/projectplan";
import Projectupdates from "../projectupdates/projectupdates";
import AppContext from "../../context/AppContext";
import "./ProjectOverview.scss";

export default class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: "task",
      tab: "project_plan",
      project_plan_data: [],
      project_update_data: [],
      project_plane_data_cats: [],
      project_plane_data_admin: [],
      project_plane_data_team: [],
    };
  }

  set_project_plane_data = (data) => {
    this.setState({
      project_plan_data: [...this.state.project_plan_data, ...data],
    });
  };

  set_project_update_data = (data) => {
    this.setState({
      project_update_data: [...this.state.project_update_data, ...data],
    });
  };

  set_project_plane_data_cats = (data) => {
    this.setState({
      project_plane_data_cats: [...this.state.project_plane_data_cats, ...data],
    });
  };

  set_project_plane_data_admin = (data) => {
    this.setState({
      project_plane_data_admin: [
        ...this.state.project_plane_data_admin,
        ...data,
      ],
    });
  };

  set_project_plane_data_team = (data) => {
    this.setState({
      project_plane_data_team: [...this.state.project_plane_data_team, ...data],
    });
  };

  render() {
    return (
      <div>
        <div className="project_overview_container">
          <div className="represent_data">
            {this.context.state.project_overview_details ? (
              <RepresentData
                infodata={{
                  title:
                    this.context.state.project_overview_details.project_name,
                  desc: this.context.state.project_overview_details
                    .project_decription,
                  startDate:
                    this.context.state.project_overview_details.start_date,
                  endDate:
                    this.context.state.project_overview_details.completion_date,
                }}
              />
            ) : (
              <div></div>
            )}
          </div>

          <div className="tabs_section">
            <span
              onClick={() =>
                this.setState({ tab: "project_plan" }, () =>
                  this.context.set_page("Project Overview")
                )
              }
            >
              {this.state.tab === "project_plan" ? (
                <span className="active_project_plan">PROJECT PLANES</span>
              ) : (
                <span className="inactive_project_plan">PROJECT PLANES</span>
              )}
            </span>
            <span
              onClick={() =>
                this.setState({ tab: "project_updates" }, () =>
                  this.context.set_page("Write Update")
                )
              }
            >
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
          <Projectplan
            set_project_plane_data_cats={this.set_project_plane_data_cats}
            project_plane_data_cats={this.state.project_plane_data_cats}
            set_project_plane_data={this.set_project_plane_data}
            set_project_plane_data_admin={this.set_project_plane_data_admin}
            set_project_plane_data_team={this.set_project_plane_data_team}
            project_plan_data={this.state.project_plan_data}
            project_plane_data_admin={this.state.project_plane_data_admin}
            project_plane_data_team={this.state.project_plane_data_team}
            history={this.props.history}
          />
        ) : (
          <Projectupdates
            set_project_update_data={this.set_project_update_data}
            project_update_data={this.state.project_update_data}
          />
        )}
      </div>
    );
  }
}

ProjectOverview.contextType = AppContext;
