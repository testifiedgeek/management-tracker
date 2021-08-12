import React, { Component } from "react";
import "./creategroup.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import {
  CreateElementTeamInput,
  CreateElementTitle,
  CreateElementProjectLeadInput,
} from "../../reusable/CreateProcessElemets/CreateProcessElements";

export default class Creategroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { data: {}, length: 0 },
      display: false,
      display_members: false,
      selected_members: { data: {}, length: 0 },
      departments: [],
      members: [],
      groupname: "",
      description: "",
    };
  }
  create_workspace = async () => {
    // Create new Project
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    this.context.set_creating_warning(
      true,
      "Succesfull",
      `Creating New Workspace ${this.state.groupname}`,
      "lightblue",
      this.context
    );
    navigate(
      "push",
      "/workspace",
      "Workspace",
      this.props.history,
      this.context
    );
    let api_data = {
      path: "/admin/createWorkSpace",
      method: "POST",
      user_token: token,
      body: {
        work_place_name: this.state.groupname,
        work_place_description: this.state.description,
      },
    };
    let result = await Fetch_function(api_data);
    if (result.status) {
      if (result.data.data.msg === "work space created successfully") {
        this.context.set_warning(
          true,
          "Succesfull",
          `Work Space ${this.state.groupname} Created Successfully1`,
          "green",
          this.context
        );
      } else if (result.data.data.msg === "This work space already exist") {
        this.context.set_warning(
          true,
          "failed",
          "This work space already exist",
          "red",
          this.context
        );
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

  selected_fun_members = (members) => {
    this.state.selected_members.data = {};
    for (let i = 0; i < members.length; i++) {
      this.state.selected_members.data[i] = members[i].emp_id;
    }
    this.setState({
      selected_members: this.state.selected_members,
    });
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
        <div className="createproject_subontainer">
          <div className="space_title">
            <CreateElementTitle
              title="Add Element Name"
              fun={() => this.input_handle_fun}
            />
          </div>

          <div className="space_members_and_lead">
            <div className="members_input">
              <h4>Select Team</h4>
              <CreateElementTeamInput
                fun={this.selected_fun_members}
                data={this.context.state.members}
              />
            </div>
            <div className="members_input">
              <h4>Add Person</h4>
              <CreateElementProjectLeadInput
                data={this.context.state.members}
                fun={this.selected_fun_members}
              />
            </div>
          </div>

          <div className="create_project_btn">
            <Button
              fun={this.create_project}
              title="Create Space"
              textcolor="white"
              width="105%"
              color="#e41e26"
            />
          </div>
        </div>
      </div>
    );
  }
}

Creategroups.contextType = AppContext;
