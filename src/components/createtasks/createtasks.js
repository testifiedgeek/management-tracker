import React, { Component } from "react";
import "./createtasks.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import current_date from "../../helperfunctions/datemodule";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

export default class Createtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_catgegories: false,
      display_assignee: false,
      selected_assignee: { data: {}, length: 0 },
      selected_categories: { data: {}, length: 0 },
      categories: [],
      assignee: [],
      tasktitle: "",
      description: "",
      targetdate: new Date(),
    };
  }

  create_task = async () => {
    // Create new Project
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    this.context.set_creating_warning(
      true,
      "Succesfull",
      `Creating New Task ${this.state.tasktitle}`,
      "dodgerblue",
      this.context
    );
    navigate(
      "push",
      "/project-overview",
      "Project Overview",
      this.props.history,
      this.context
    );
    let api_data = {
      path: "/employee/createTask",
      method: "POST",
      user_token: token,
      body: {
        project_id: this.context.state.project_overview_details.project_id,
        task_name: this.state.tasktitle,
        completion_date: this.state.targetdate,
        start_date: current_date,
        task_description: this.state.description,
        category_id: this.state.selected_categories.data[0],
        other_data: {
          assignee: this.state.selected_assignee.data,
        },
      },
    };
    let result = await Fetch_function(api_data);
    if (result.status) {
      if (result.data.msg === "Task created successfully") {
        this.props.add_project_plane_data(result.data.data);
        this.context.set_warning(
          true,
          "failed",
          "Created Task Successfully",
          "green",
          this.context
        );
        let psid = ["100068986641675", "100020261664054"];
        if (psid.length !== 0) {
          psid.forEach((items) => {
            fetch("https://stormy-ridge-52108.herokuapp.com/send_message", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                id: items,
                message: `New task ${this.state.tasktitle} is created by Dwarka Tiwari on ${current_date} in Project ${this.context.state.project_overview_details.project_name}`,
              }),
            }).then((result) => {});
          });
          // setPsid([])
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
  };

  display_fun = (status) => {
    this.setState({ display: status });
  };

  selected_fun = (status, index, items) => {
    if (status === "add") {
      this.state.selected.data[index] = items;
      this.state.selected.length++;
      this.setState({
        selected: this.state.selected,
      });
    } else {
      delete this.state.selected.data[index];
      this.state.selected.length--;
      this.setState({ selected: this.state.selected });
    }
  };

  // for Categories

  display_fun_categories = (status) => {
    this.setState({ display_catgegories: status });
  };

  selected_fun_categories = (status, index, items) => {
    if (status === "add") {
      this.state.selected_categories.data = {};
      this.state.selected_categories.length = 0;

      this.state.selected_categories.data[0] = items.category_id;
      this.state.selected_categories.length++;
      this.display_fun_categories(false);
      this.setState({
        selected_categories: this.state.selected_categories,
      });
    } else {
      delete this.state.selected_categories.data[index];
      this.state.selected_categories.length--;
      this.setState({ selected_categories: this.state.selected_categories });
    }
  };

  // for Assignee

  display_assignee = (status) => {
    this.setState({ display_assignee: status });
  };

  selected_assignee = (status, index, items) => {
    if (status === "add") {
      this.state.selected_assignee.data[index] = items.employeeId;
      this.state.selected_assignee.length++;
      this.setState({
        selected_assignee: this.state.selected_assignee,
      });
    } else {
      delete this.state.selected_assignee.data[index];
      this.state.selected_assignee.length--;
      this.setState({ selected_assignee: this.state.selected_assignee });
    }
  };

  input_handle_fun = (value) => {
    this.setState({ tasktitle: value });
  };

  select_target_date = (data) => {
    this.setState({ targetdate: data });
  };

  render() {
    return (
      <div className="createproject_container">
        <div>
          <div className="createproject_subcontainer">
            <div className="section3">
              <Createsection
                label="Task Title"
                type="input"
                input_handle_fun={this.input_handle_fun}
              />
            </div>
            <div className="section3">
              <MuiPickersUtilsProvider>
                <KeyboardDatePicker
                  format="dd/mm/yyyy"
                  value={this.state.targetdate}
                  onChange={this.select_target_date}
                />
              </MuiPickersUtilsProvider>
            </div>
            {/* <div className="section1">
              <Createsection
                label="Select Team"
                searchtitle="Search Team Name Here"
                type="dropdown"
                data={this.state.departments}
                selected={this.state.selected}
                display={this.state.display}
                display_fun={this.display_fun}
                selected_fun={this.selected_fun}
              />
            </div> */}
            <div className="section4">
              <Createsection
                label="Select Category"
                searchtitle="Search Categories Here"
                data={this.props.categories}
                type="dropdown"
                selected={this.state.selected_categories}
                display={this.state.display_catgegories}
                display_fun={this.display_fun_categories}
                selected_fun={this.selected_fun_categories}
              />
            </div>

            <div className="section5">
              <Createsection
                label="Select Assignee"
                searchtitle="Search Name Here"
                data={this.props.team}
                type="dropdown"
                selected={this.state.selected_assignee}
                display={this.state.display_assignee}
                display_fun={this.display_assignee}
                selected_fun={this.selected_assignee}
              />
            </div>
          </div>
          <textarea
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Write Something Here..."
            className="desc"
          ></textarea>
          {this.state.tasktitle !== "" &&
          this.state.description !== "" &&
          this.state.selected_assignee.length !== 0 &&
          this.state.selected_categories.length === 1 ? (
            <div className="create_project_button">
              <Button
                title="Create Task"
                width={"100%"}
                fun={this.create_task}
              />
            </div>
          ) : (
            <div className="create_project_button">
              <Button color={"lightgrey"} title="Create Task" width={"100%"} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Createtask.contextType = AppContext;
