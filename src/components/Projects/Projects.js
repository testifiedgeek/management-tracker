import React, { Component } from "react";
import "./Projects.scss";
import search from "../../assets/search.svg";
import { Card } from "../../reusable/cardcomponent/CardComponent";
import AppContext from "../../context/AppContext";
import Createproject from "../createproject/Createproject";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import TableCard from "../../reusable/TableCard/TableCard";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_project: "",
      enable_create_section: false,
      firsttime: true,
      content: [
        {
          srno: 1,
          title: "Policy maker",
          name: "Policy maker",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
          task_status: "complete",
        },
        {
          srno: 1,
          title: "Kompass",
          name: "Kompass ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "sampoorna Suraksha",
          name: "sampoorna Suraksha",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "BPR Inovation",
          name: "BPR Inovation ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
      ],
    };
  }

  // Create Project
  create_project = () => {
    this.setState({ enable_create_section: true });
    navigate(
      "push",
      "/projects",
      "Create Project",
      this.props.history,
      this.context
    );
  };

  handleProject = (project) => {
    this.context.setproject_overview(project);
    navigate(
      "push",
      "/project-overview",
      "Project Overview",
      this.props.history,
      this.context
    );
  };

  async componentDidMount() {
    // Fetch Projects in which loged in user is included
    if (
      this.context.state.projects.length === 0 &&
      this.state.firsttime === true
    ) {
      let token = await window.localStorage.getItem("hdfcmanagementtracker");
      let api_data = {
        path: "/employee/createProject",
        method: "GET",
        user_token: token,
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        if (result.data.msg === "successful" && result.data.data) {
          if (result.data.data.length !== 0) {
            this.context.set_projects(result.data.data);
            this.setState({ firsttime: false });
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
    }
  }

  add_new_created_project = (data) => {
    this.context.set_projects(data);
  };

  render() {
    let searchdata;
    if (this.state.search_project !== "") {
      searchdata = this.context.state.projects.filter((items) => {
        if (
          items.project_name
            .toLowerCase()
            .includes(this.state.search_project.toLowerCase())
        ) {
          return items;
        }
      });
    }

    return (
      <div>
        <div>
          {this.context.state.page !== "Create Project" ? (
            <div className="main_projects_web_container">
              <h3>All Projects types - all categories</h3>
              <div class="search_container">
                <div class="search_subcontainer">
                  <img src={search} />
                  <input
                    onChange={(e) =>
                      this.setState({ search_project: e.target.value })
                    }
                    type="text"
                    className="input_search"
                    placeholder="Type to search project"
                  />
                  <span>Sort By</span>
                </div>
              </div>

              <div className="create_project_btn">
                <Button title="Create Project" fun={this.create_project} />
              </div>
            </div>
          ) : (
            <div className="project_createsection">
              <Createproject
                add_new_created_project={this.add_new_created_project}
                history={this.props.history}
              />
            </div>
          )}

          {/* Statistics Slide */}
          {this.context.state.projects.length !== 0 ? (
            <div className="table_container">
              <TableCard
                title=""
                content={
                  this.state.search_project === ""
                    ? this.context.state.projects
                    : searchdata
                }
                rows={[
                  "project_name",
                  "work_place_id",
                  "created_by",
                  "start_date",
                  "completion_date",
                ]}
                handleViewTask={this.handleProject}
                headings={[
                  "Project Name",
                  "Team",
                  "Project Lead",
                  "Start Date",
                  "Target Date",
                  "",
                ]}
                serial="true"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Mobile View of project screens */}
        <div className="main_projects_mobile_container">
          <div class="search_container">
            <div class="search_subcontainer">
              <img src={search} />
              <input
                onChange={(e) =>
                  this.setState({ search_project: e.target.value })
                }
                type="text"
                className="input_search"
                placeholder="Type to search project"
              />
            </div>
          </div>
        </div>

        {/* All Projects data in particular workplace */}
        <div className="card_data_mobileview">
          {this.context.state.projects.length !== 0 ? (
            <Card
              title="Project Developement"
              navigation={{
                state: "push",
                path: "/project-overview",
                page: "Project Overview",
                history: this.props.history,
                context: this.context,
              }}
              content={
                this.state.search_project === ""
                  ? this.context.state.projects
                  : searchdata
              }
            />
          ) : (
            <div>
              <p>Noting is there...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Projects.contextType = AppContext;
