import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import "./dashboard.scss";
import { TaskCard } from "../../reusable/cardcomponent/CardComponent";
import TodoList from "../../reusable/createSubtask";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import navigate from "../../helperfunctions/navigation";
import TableCard from "../../reusable/TableCard/TableCard";
import { fi } from "date-fns/locale";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks_work_status: {
        completed: 0,
        notaccepted: 0,
        inprogress: 0,
      },
    };
  }

  calculate_task_statistics = (data) => {
    let percent_per_task = 100 / data.length;
    data.forEach((task) => {
      if (task.final_status === 0) {
        // Not Accepted
        this.setState((state) => ({
          tasks_work_status: {
            completed: state.tasks_work_status.completed,
            notaccepted: state.tasks_work_status.notaccepted + percent_per_task,
            inprogress: state.tasks_work_status.inprogress,
          },
        }));
      } else if (task.final_status === 1) {
        // In Progress
        this.setState((state) => ({
          tasks_work_status: {
            completed: state.tasks_work_status.completed,
            notaccepted: state.tasks_work_status.notaccepted,
            inprogress: state.tasks_work_status.inprogress + percent_per_task,
          },
        }));
      } else if (task.final_status === 2) {
        // In Progress
        this.setState((state) => ({
          tasks_work_status: {
            completed: state.tasks_work_status.completed + percent_per_task,
            notaccepted: state.tasks_work_status.notaccepted,
            inprogress: state.tasks_work_status.inprogress,
          },
        }));
      }
    });
  };

  async componentDidMount() {
    // Fetch Tasks assign to loged in user

    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    if (this.context.state.tasks.length === 0) {
      let api_data = {
        path: "/employee/createTask/",
        method: "GET",
        user_token: token,
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        this.context.set_tasks(result.data.data);
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

    this.calculate_task_statistics(this.context.state.tasks);

    if (this.context.state.categories.length === 0) {
      let api_data2 = {
        path: "/employee/createCategory/",
        method: "GET",
        user_token: token,
      };
      Fetch_function(api_data2).then((result2) => {
        if (result2.status) {
          if (result2.data.data.length !== 0) {
            this.context.set_categories(result2.data.data);
          }
        }
      });
    }

    if (this.context.state.departments.length === 0) {
      let api_data3 = {
        path: "/employee/getWorkSpace",
        method: "GET",
        user_token: token,
      };
      let result3 = await Fetch_function(api_data3);
      if (result3.status) {
        if (result3.data.data.length !== 0) {
          this.context.set_departments(result3.data.data);
        }
      }
    }

    //   if (this.context.state.members.length === 0) {
    //     let api_data4 = {
    //       path: "/employee/getUser/",
    //       method: "GET",
    //       user_token: token,
    //     };
    //     let result4 = await Fetch_function(api_data4);
    //     if (result4.status) {
    //       if (result4.data.data.length !== 0) {
    //         this.context.set_members(result4.data.data);
    //       }
    //     }
    //   }
  }

  handleTask = (task) => {
    this.context.settask_overview(task);
    navigate("push", "/task", "Task Details", this.props.history, this.context);
  };

  handleClickTaskStatus = (task, status) => {
    this.context.state.tasks.some((task_items) => {
      if (
        task.task_id === task_items.task_id &&
        task.category_id === task_items.category_id
      ) {
        task_items.final_status = status;
      }
    });
    this.context.set_tasks(this.context.state.tasks);
    this.setState({
      tasks_work_status: {
        completed: 0,
        notaccepted: 0,
        inprogress: 0,
      },
    });
    this.calculate_task_statistics(this.context.state.tasks);
  };

  render() {
    return (
      <div className="dashboard_container">
        <div className="stats_data_main_container">
          <ShowStats
            navigation={{
              state: "push",
              path: "/projects",
              page: "Projects",
              history: this.props.history,
              context: this.context,
            }}
            title="Total Projects"
            component="Dashboard"
            statsData={[
              {
                color: "green",
                title: "Completed",
                percentage:
                  window.parseInt(this.state.tasks_work_status.completed) + "%",
              },
              {
                color: "orange",
                title: "In Progress",
                percentage:
                  window.parseInt(this.state.tasks_work_status.inprogress) +
                  "%",
              },
              {
                color: "red",
                title: "Not Accepted",
                percentage:
                  window.parseInt(this.state.tasks_work_status.notaccepted) +
                  "%",
              },
            ]}
          />
        </div>
        <br />
        {/* <h4 >Tasks Assign to me</h4> */}

        {/* Statistics Slide */}
        <div className="table_data_webview">
          <TableCard
            title="Task Assign To Me"
            content={this.context.state.tasks}
            rows={[
              "task_name",
              "start_date",
              "completion_date",
              "final_status",
            ]}
            handleViewTask={this.handleTask}
            handleClickTaskStatus={this.handleClickTaskStatus}
            headings={["Task", "Start Date", "Target Date", "Status"]}
            serial="true"
            // task="true"
          />
        </div>
        {/* <div className="table_data_webview">
          <TodoList />
        </div> */}

        <div className="card_data_mobileview">
          <TaskCard
            title="Project Developement"
            navigation={{
              state: "push",
              path: "/project-overview",
              page: "Project Overview",
              history: this.props.history,
              context: this.context,
            }}
            content={this.context.state.tasks}
          />
        </div>
      </div>
    );
  }
}

Dashboard.contextType = AppContext;
