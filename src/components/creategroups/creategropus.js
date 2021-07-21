import React, { Component } from "react";
import "./creategroup.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";

export default class Creategroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { data: {}, length: 0 },
      display: false,
      display_members: false,
      selected_members: { data: {}, length: 0 },
      departments: [
        "INNOVATION",
        "SALES",
        "BPR",
        "CALLERS",
        "NETWORK",
        "AI",
        "TECHNOLOGY",
        "CALLERS",
        "NETWORK",
        "AI",
        "TECHNOLOGY",
      ],
      members: [
        "Abhisheck Badjatiya",
        "Dwarka Tiwari",
        "Anubhab",
        "Next manager",
        "Kiran Hulavle",
        "Project Deployment",
        "Project Finalization",
      ],
      groupname: "",
    };
  }
  create_project = () => {};

  display_fun = (status) => {
    this.setState({ display: status });
  };

  selected_fun = (status, index, items) => {
    if (status === "add") {
      this.state.selected.data = {};
      this.state.selected.length = 0;
      this.state.selected.data[index] = items;
      this.state.selected.length++;
      this.display_fun(false);
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

  display_fun_members = (status) => {
    this.setState({ display_members: status });
  };

  selected_fun_members = (status, index, items) => {
    console.log("status, index,items: ", status, index, items);
    if (status === "add") {
      this.state.selected_members.data[index] = items;
      this.state.selected_members.length++;
      this.setState({
        selected_members: this.state.selected_members,
      });
    } else {
      delete this.state.selected_members.data[index];
      this.state.selected_members.length--;
      this.setState({ selected_members: this.state.selected_members });
    }
  };

  // for Lead

  display_lead = (status) => {
    this.setState({ display_lead: status });
  };

  selected_lead = (status, index, items) => {
    if (status === "add") {
      this.state.selected_lead.data[index] = items;
      this.state.selected_lead.length++;
      this.setState({
        selected_lead: this.state.selected_lead,
      });
    } else {
      delete this.state.selected_lead.data[index];
      this.state.selected_lead.length--;
      this.setState({ selected_lead: this.state.selected_lead });
    }
  };

  input_handle_fun = (value) => {
    this.setState({ groupname: value });
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
                label="Unique Group Name"
                type="input"
                input_handle_fun={this.input_handle_fun}
              />
            </div>
            <div className="section1">
              <Createsection
                label="Select Department"
                searchtitle="Search Department Here"
                type="dropdown"
                data={this.state.departments}
                selected={this.state.selected}
                display={this.state.display}
                display_fun={this.display_fun}
                selected_fun={this.selected_fun}
              />
            </div>
            <div className="section4">
              <Createsection
                label="Select Members"
                searchtitle="Search Name Here"
                data={this.state.members}
                type="dropdown"
                selected={this.state.selected_members}
                display={this.state.display_members}
                display_fun={this.display_fun_members}
                selected_fun={this.selected_fun_members}
              />
            </div>
          </div>
          <textarea
            placeholder="Write Something Here..."
            className="desc"
          ></textarea>
          <div className="create_project_button">
            <Button
              title="Create Group"
              width={"100%"}
              fun={this.create_project}
            />
          </div>
        </div>
      </div>
    );
  }
}

Creategroups.contextType = AppContext;
