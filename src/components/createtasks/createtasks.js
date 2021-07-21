import React, { Component } from "react";
import "./createtasks.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";

export default class Createtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_catgegories: false,
      display_assignee: false,
      selected_assignee: { data: {}, length: 0 },
      selected_categories: { data: {}, length: 0 },
      categories: [
        "Project Planning",
        "Project Design",
        "Project Requirements",
        "Project Development",
        "Project Testing",
        "Project Deployment",
        "Project Finalization",
      ],
      assignee: [
        "Abhisheck Badjatiya",
        "Dwarka Tiwari",
        "Anubhab",
        "Next manager",
        "Kiran Hulavle",
        "Project Deployment",
        "Project Finalization",
      ],
      tasktitle: "",
      description: "",
      targetdate: "",
    };
  }
  create_project = () => {};

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

      this.state.selected_categories.data[index] = items;
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
      this.state.selected_assignee.data[index] = items;
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

  traget_date_input_handle_fun = (value) => {
    this.setState({ targetdate: value });
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
              <Createsection
                label="Targeted Date"
                type="input"
                input_handle_fun={this.traget_date_input_handle_fun}
              />
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
                data={this.state.categories}
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
                data={this.state.assignee}
                type="dropdown"
                selected={this.state.selected_assignee}
                display={this.state.display_assignee}
                display_fun={this.display_assignee}
                selected_fun={this.selected_assignee}
              />
            </div>
          </div>
          <textarea
            placeholder="Write Something Here..."
            className="desc"
          ></textarea>
          <div className="create_project_button">
            <Button
              title="Create Task"
              width={"100%"}
              fun={this.create_project}
            />
          </div>
        </div>
      </div>
    );
  }
}

Createtask.contextType = AppContext;
