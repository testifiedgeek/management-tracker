import React, { Component } from "react";
import "./createsubtask.scss";
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
import DateFnsUtils from "@date-io/date-fns";

export default class Createsubtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasktitle: "",
      description: "",
      targetdate: new Date(),
    };
  }

  create_subtask = async () => {
    // Create new Project
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    this.context.set_creating_warning(
      true,
      "Succesfull",
      `Creating New Sub Task ${this.state.tasktitle}`,
      "dodgerblue",
      this.context
    );
    navigate("push", "/task", "Task Details", this.props.history, this.context);
    let api_data = {
      path: "/employee/createSubTask/",
      method: "POST",
      user_token: token,
      body: {
        project_id: this.context.state.task_overview_details.project_id,
        task_id: this.context.state.task_overview_details.task_id,
        sub_task_name: this.state.tasktitle,
        completion_date: this.state.targetdate,
        start_date: current_date,
        sub_task_description: this.state.description,
        category_id: this.context.state.task_overview_details.category_id,
        other_data: {
          assignee: { 0: this.context.state.task_overview_details.assigned_to },
        },
      },
    };
    let result = await Fetch_function(api_data);
    if (result.status) {
      if (result.data.msg === "Sub task created successfully") {
        this.context.set_warning(
          true,
          "failed",
          "Created Task Successfully",
          "green",
          this.context
        );
      }
    } else {
      this.context.set_warning(
        true,
        "failed",
        "Something Went Wrong",
        "red",
        this.context
      );
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="dd/mm/yyyy"
                  value={this.state.targetdate}
                  onChange={this.select_target_date}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <textarea
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Write Something Here..."
            className="desc"
          ></textarea>
          <div className="create_project_button">
            <Button
              title="Create Task"
              width={"100%"}
              fun={this.create_subtask}
            />
          </div>
        </div>
      </div>
    );
  }
}

Createsubtask.contextType = AppContext;
