import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Button from "../../reusable/button/button";
import Createsubtask from "../createsubtask/CreateSubTask";
import StatusBtn from "../../reusable/taskstatus_button/statusbutton";
import navigate from "../../helperfunctions/navigation";
import AppContext from "../../context/AppContext";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import TableCard from "../../reusable/TableCard/TableCard";

export default class Taskplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      assigned_to: "",
    };
  }
  create_task = () => {
    navigate(
      "push",
      "/task-overview",
      "Create Task",
      this.props.history,
      this.context
    );
  };

  async componentDidMount() {
    //     let token = await window.localStorage.getItem("hdfcmanagementtracker");
    //     let _catsapi_data = {
    //       path: `/employee/createCategory/NA/${this.context.state.project_overview_details.project_id}`,
    //       method: "GET",
    //       user_token: token,
    //     };
    //     let result = await Fetch_function(_catsapi_data);
    //     if (result) {
    //       if (result.msg === "Something went wrong") {
    //         this.context.set_warning(
    //           true,
    //           "failed",
    //           "Something Went Wrong",
    //           "red",
    //           this.context
    //         );
    //       } else if (result.msg === "successful") {
    //         this.props.set_project_plane_data_cats(result.data);
    //       }
    //     } else {
    //       this.context.set_warning(
    //         true,
    //         "failed",
    //         "Something Went Wrong",
    //         "red",
    //         this.context
    //       );
    //     }
    //     let api_data = {
    //       path: `/employee/createTask/NA/${this.context.state.project_overview_details.project_id}`,
    //       method: "GET",
    //       user_token: token,
    //     };
    //     let result2 = await Fetch_function(api_data);
    //     if (result2) {
    //       if (result2.msg === "Something went wrong") {
    //         this.context.set_warning(
    //           true,
    //           "failed",
    //           "Something Went Wrong",
    //           "red",
    //           this.context
    //         );
    //       } else if (result2.msg === "successful") {
    //         this.props.set_project_plane_data(result2.data);
    //       }
    //     } else {
    //       this.context.set_warning(
    //         true,
    //         "failed",
    //         "Something Went Wrong",
    //         "red",
    //         this.context
    //       );
    //     }
    //     this.props.project_plane_data_cats.forEach((items) => {
    //       this.state.divide.push({
    //         cat_id: items.category_id,
    //         cat_name: items.category_name,
    //         tasks: [],
    //       });
    //     });
    //     this.props.project_plan_data.forEach((items2) => {
    //       this.state.divide.forEach((items) => {
    //         if (items.cat_id === items2.category_id) {
    //           items.tasks.push(items2);
    //         }
    //       });
    //     });
    //     this.setState({ update: true });
  }

  calculatestatus = () => {
    if (
      this.context.state.task_overview_details.assigned_to ===
      parseInt(this.context.state.user.employeeid)
    ) {
      if (this.context.state.task_overview_details.final_status === 0) {
        return "Accept";
      } else if (this.context.state.task_overview_details.final_status === 1) {
        return "Click to Complete";
      }
    } else {
      if (this.context.state.task_overview_details.final_status === 0) {
        return "Not Accept Yet";
      } else if (this.context.state.task_overview_details.final_status === 1) {
        return "Task In Progress";
      } else if (this.context.state.task_overview_details.final_status === 2) {
        return "Task Completed";
      }
    }
  };

  checkAdminStatus = () => {
    if (
      this.context.state.task_overview_details.assigned_to ===
      parseInt(this.context.state.user.employeeid)
    ) {
      return true;
    }
  };

  renderStatus = () => {
    return (
      <StatusBtn
        userId={this.context.state.user.employeeid}
        task={this.context.state.task_overview_details}
      />
    );
  };

  render() {
    let assined_to = this.context.state.members.filter((items) => {
      if (
        this.context.state.task_overview_details.assigned_to === items.emp_id
      ) {
        return items.first_name + " " + items.last_name;
      }
    });

    console.log(assined_to);
    return (
      <div>
        <div className="respersent_data_container">
          <div className="stats_represantation">
            <ShowStats
              navigation={{
                state: "push",
                path: "/project-overview",
                page: "Project Overview",
                history: this.props.history,
                context: this.context,
              }}
              title="Project Status"
              statsData={[
                { color: "blue", title: "Active", percentage: "20%" },
                { color: "red", title: "Inprogress", percentage: "80%" },
              ]}
            />
          </div>
          <div className="info_represantation">
            <Infoboxes
              info={[
                {
                  title: "Assinged To",
                  name:
                    assined_to[0].first_name + " " + assined_to[0].last_name
                      ? assined_to[0].last_name
                      : assined_to[0].first_name,
                },
                {
                  title: "Task Status",
                  name: this.renderStatus(),
                },
              ]}
            />
          </div>
        </div>

        {/* Web View for categories */}

        {/* // Table Statistics */}

        {/* <div className="plane_table_data_webview">
          {this.state.divide.map((items) => {
            if (items.tasks.length !== 0) {
              return (
                <div className='project_table_subcontainer'>
                <TableCard
                  title={items.cat_name + ' ' + ('(100%)')}
                  content={items.tasks}
                  rows={[
                    "task_name",
                    "assigned_to",
                    "completion_date",
                    "is_active",
                    "Rework/Chages",
                  ]}
                  handleViewTask={this.handleTask}
                  headings={["Task", "Assigned To", "Target Date", "Status"]}
                  serial="true"
                />
                </div>
              );
            }
          })}
        </div> */}

        {/* Mobile View for categories */}
        <div className="plane_mobile_sections">
          <h5>Categories</h5>
        </div>

        {this.context.state.page === "Create Task" ? (
          <div className="create_task">
            <Createsubtask
              categories={this.props.project_plane_data_cats}
              team={this.props.project_plane_data_team}
              history={this.props.history}
            />
          </div>
        ) : (
          <div className="plane_sections">
            <div className="plane_subsections">
              <h5>Categories</h5>
              <h5>Filter</h5>
            </div>
            {this.checkAdminStatus() ? (
              <Button title="Create Task" fun={this.create_task} />
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Taskplan.contextType = AppContext;
