import React, { Component } from "react";
import "./Projects.scss";
import search from "../../assets/search.svg";
import innovation from "../../assets/innovation.svg";
import { Card } from "../../reusable/cardcomponent/CardComponent";
import AppContext from "../../context/AppContext";
import Createproject from "../createproject/Createproject";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import TableCard from "../../reusable/TableCard/TableCard";
import ProjectCard from "../../reusable/projectcard/projectcard";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_project: "",
      filter: 0,
      enable_create_section: false,
      firsttime: true,
      content: [],
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
              {/* <h3>All Projects types - all categories</h3> */}
              <div className="search_container">
                {/* <div class="search_subcontainer">
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
                </div> */}

                <Paper square>
                  <Tabs
                    value={this.state.filter}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, value) => this.setState({ filter: value })}
                    aria-label="disabled tabs example"
                  >
                    <Tab label="All" />
                    <Tab label="In Progress" />
                    <Tab label="Completed" />
                  </Tabs>
                </Paper>
                {/* <div className="filter_section">
                  <span onClick={() => this.setState({ filter: "ALL" })}>
                    All
                  </span>
                  <span onClick={() => this.setState({ filter: "INPROGRESS" })}>
                    In Progress
                  </span>
                  <span onClick={() => this.setState({ filter: "COMPLETED" })}>
                    Completed
                  </span>
                  <span></span>
                </div> */}
              </div>
              {/* 
              <div className="create_project_btn">
                <Button title="Create Project" fun={this.create_project} />
              </div> */}
            </div>
          ) : (
            <div className="project_createsection">
              <Createproject
                add_new_created_project={this.add_new_created_project}
                history={this.props.history}
              />
            </div>
          )}
            <div className="projects_grid_system">
              {this.state.content.map((items) => {
                return (
                  <ProjectCard content={items}/>
                );
              })}
            </div>
          {/* Statistics Slide */}
          {this.context.state.projects.length !== 0 ? (
            <div className="project_grid_container">
              {this.state.filter === 0
                ? this.context.state.projects.map((items) => {
                    return (
                      <ProjectCard
                        handleViewTask={this.handleProject}
                        content={items}
                      />
                    );
                  })
                : this.state.filter === 1
                ? this.context.state.projects.map((items) => {
                    if (items.final_status == 0) {
                      return (
                        <ProjectCard
                          handleViewTask={this.handleProject}
                          content={items}
                        />
                      );
                    }
                  })
                : this.context.state.projects.map((items) => {
                    if (items.final_status == 1) {
                      return (
                        <ProjectCard
                          handleViewTask={this.handleProject}
                          content={items}
                        />
                      );
                    }
                  })}
              {/* <TableCard
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
              /> */}
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Mobile View of project screens */}
        <div className="main_projects_mobile_container">
          <div className="search_container">
            <div className="search_subcontainer">
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
