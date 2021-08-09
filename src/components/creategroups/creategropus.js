import React, { Component } from "react";
import "./creategroup.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";

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
      if (result.data.msg === "work space created successfully") {
        this.context.set_warning(
          true,
          "Succesfull",
          `Work Space ${this.state.groupname} Created Successfully1`,
          "green",
          this.context
        );
      } else if (result.data.msg === "This work space already exist") {
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
                label="Unique Workspace Name"
                type="input"
                input_handle_fun={this.input_handle_fun}
              />
            </div>
            {/* <div className="section1">
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
            </div> */}
            {/* <div className="section4">
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
            </div> */}
          </div>
          <textarea
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Write Something Here About Workspace..."
            className="desc"
          ></textarea>
          <div className="create_project_button">
            <Button
              title="Create Workspace"
              width={"100%"}
              fun={this.create_workspace}
            />
          </div>
        </div>
      </div>
    );
  }
}

Creategroups.contextType = AppContext;
