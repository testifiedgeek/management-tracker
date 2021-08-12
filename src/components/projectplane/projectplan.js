import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Button from "../../reusable/button/button";
import Createtask from "../createtasks/createtasks";
import "./projectplane.scss";
import navigate from "../../helperfunctions/navigation";
import AppContext from "../../context/AppContext";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import TableCard from "../../reusable/TableCard/TableCard";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RepresentData from "../../reusable/textinfo/textdata.js";
import DescriptionCard from "../../reusable/projectdesc/projectdesc";
import StatsCard from "../../reusable/StatisticsCard/statisticsCard";


let divide = {};

export default class Projectplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divide: [],
      admin: [],
      update: false,
      projectStatus: { complete: 0, incomplet: 0 },
      filter: 0,
    };
  }
  create_task = () => {
    navigate(
      "push",
      "/project-overview",
      "Create Task",
      this.props.history,
      this.context
    );
  };

  async componentDidMount() {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");

    if (this.props.project_plane_data_cats.length === 0) {
      let all_project_data = {
        path: `/employee/createProject/${this.context.state.project_overview_details.project_id}`,
        method: "GET",
        user_token: token,
      };
      let result = await Fetch_function(all_project_data);
      console.log(result);
      if (result.status) {
        if (result.data.msg === "successful") {
          this.props.set_project_plane_data_cats(
            result.data.data[0].categoriesDetails
          );
          this.props.set_project_plane_data_admin(
            result.data.data[0].projectAdminDetails
          );
          this.props.set_project_plane_data_team(
            result.data.data[0].projectTeamDetails
          );
          this.setState({ admin: result.data.data[0].projectAdminDetails });
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

    if (this.props.project_plan_data.length === 0) {
      let api_data = {
        path: `/employee/createTask/NA/${this.context.state.project_overview_details.project_id}`,
        method: "GET",
        user_token: token,
      };
      let result2 = await Fetch_function(api_data);
      console.log("result2: ", result2);
      if (result2.status) {
        if (result2.data.msg === "successful") {
          this.props.set_project_plane_data(result2.data.data);
        }
      } else {
        this.context.set_warning(
          true,
          "failed",
          result2.data,
          "red",
          this.context
        );
      }
    }

    this.projectdividation();
    this.calculate_work_status();
    this.calculate_project_work_status();
    this.setState({ update: true });
  }

  projectdividation = () => {
    this.setState({ divide: [] });
    this.props.project_plane_data_cats.forEach((items) => {
      this.state.divide.push({
        cat_id: items.category_id,
        cat_name: items.category_name,
        cat_work_status: { completed: 0, incomplete: 0 },
        cat_percentage: items.category_percentage,
        tasks: [],
      });
    });

    this.props.project_plan_data.forEach((items2) => {
      this.state.divide.forEach((items) => {
        if (items.cat_id === items2.category_id) {
          items.tasks.push(items2);
        }
      });
    });
  };

  calculate_project_work_status = () => {
    let percentage_for_per_cat = 100 / this.state.divide.length;
    let total_completed_project = 0;
    let total_incompleted_project = 0;
    this.state.divide.forEach((items) => {
      total_incompleted_project =
        (percentage_for_per_cat / 100) * items["cat_work_status"].incomplete;
      total_completed_project =
        (percentage_for_per_cat / 100) * items["cat_work_status"].completed;
      this.setState((state) => {
        this.setState({
          projectStatus: {
            complete: state.projectStatus.complete + total_completed_project,
            incomplet:
              state.projectStatus.incomplet + total_incompleted_project,
          },
        });
      });
    });
  };

  calculate_work_status = () => {
    this.state.divide.forEach((items) => {
      items.tasks.forEach((task) => {
        if (task.final_status === 0 || task.final_status === 1) {
          items["cat_work_status"].incomplete =
            items["cat_work_status"].incomplete +
            parseInt(task.task_percentage);
        } else if (task.final_status === 2) {
          items["cat_work_status"].completed =
            items["cat_work_status"].completed + parseInt(task.task_percentage);
        }
      });
    });
  };

  handleTask = (task) => {
    this.context.settask_overview(task);
    navigate("push", "/task", "Task Details", this.props.history, this.context);
  };

  set_project_plane_data = (data) => {
    this.props.set_project_plane_data(data);
    this.projectdividation();
  };

  checkAdminStatus = () => {
    let status = this.props.project_plane_data_admin.some((admin) => {
      if (admin.assigned_to === parseInt(this.context.state.user.employeeid)) {
        return true;
      }
    });
    console.log(status);
    return status;
  };

  handleClickTaskStatus = (task, status) => {
    this.state.divide.some((task_items) => {
      if (task.category_id === task_items.cat_id) {
        task_items.tasks.some((task_items_status) => {
          if (task.task_id === task_items_status.task_id) {
            task_items_status.final_status = status;
          }
        });
      }
    });
    this.setState({ divide: this.state.divide });
    this.calculate_work_status();
  };

  

  render() {
    return (
      <div>
        <div className="respersent_data_container">
          <div className="stats_represantation">
            <StatsCard
              navigation={{
                state: "push",
                path: "/project-overview",
                page: "Project Overview",
                history: this.props.history,
                context: this.context,
              }}
              title="Project Status"
              statsData={[
                {
                  color: "green",
                  title: "Completed",
                  percentage:
                    window.parseInt(this.state.projectStatus.complete) + "%",
                },
                {
                  color: "red",
                  title: "Inprogress",
                  percentage:
                    window.parseInt(this.state.projectStatus.incomplet) + "%",
                },
              ]}
            />
          </div>
          <DescriptionCard />
        </div>

        {/* Web View for categories */}
        {this.context.state.page === "Create Task" ? (
          <div className="create_task">
            <Createtask
              categories={this.props.project_plane_data_cats}
              team={this.props.project_plane_data_team}
              history={this.props.history}
              add_project_plane_data={this.set_project_plane_data}
            />
          </div>
        ) : (
          <div className="plane_sections">
            <div className="plane_subsections">
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
                    <Tab label="Yet To Start" />
                  </Tabs>
                </Paper>
            </div>
            {/* {this.checkAdminStatus() ? (
              <Button title="Create Task" fun={this.create_task} />
            ) : (
              <div></div>
            )} */}
          </div>
        )}

        {/* // Table Statistics */}

        <div className="plane_table_data_webview">
          {this.state.divide.map((items) => {
            if (items.tasks.length !== 0) {
              console.log(this.props.project_plan_data);
              return (
                <div className="project_table_subcontainer">
                  <TableCard
                    title={items.cat_name}
                    content={items.tasks}
                    rows={[
                      "task_name",
                      "assigned_to",
                      "completion_date",
                      "final_status",
                    ]}
                    handleClickTaskStatus={this.handleClickTaskStatus}
                    handleViewTask={this.handleTask}
                    headings={["Task", "Assigned To", "Target Date", "Status"]}
                    serial="false"
                    table_status="Completed"
                  />
                </div>
              );
            }
          })}
        </div>

        {/* Mobile View for categories */}
        <div className="plane_mobile_sections">
          <h5>Categories</h5>
        </div>
      </div>
    );
  }
}

Projectplan.contextType = AppContext;
