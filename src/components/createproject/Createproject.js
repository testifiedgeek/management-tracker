import React, { Component } from "react";
import "./createproject.scss";
import AppContext from "../../context/AppContext";
import {
  CreateElementTeamInput,
  CreateElementTitle,
  CreateElementProjectLeadInput,
  CreateElementDesc,
  CreateElementDate,
} from "../../reusable/CreateProcessElemets/CreateProcessElements";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import current_date from "../../helperfunctions/datemodule";
import ReturnInput from "../../reusable/createcategoriesinput/CreateStages";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class Createproject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { data: {}, length: 0 },
      display: false,
      display_catgegories: false,
      display_members: false,
      display_lead: false,
      selected_lead: { data: {}, length: 0 },
      selected_categories: { data: {}, length: 0 },
      selected_members: { data: {}, length: 0 },
      departments: [],
      categories: [],
      lead: [],
      projectname: "",
      targetdate: new Date(),
      startdate: new Date(),
      description: "",
      fields: [],
      stageName: "",
      stagePercentage: "",
    };
  }

  create_project = async () => {
    // Create new Project
    if (this.context.state.selected_department) {
      let token = await window.localStorage.getItem("hdfcmanagementtracker");
      console.log("token: ", token);
      this.context.set_creating_warning(
        true,
        "Succesfull",
        `Creating New Project ${this.state.projectname}`,
        "lightblue",
        this.context
      );
      navigate(
        "push",
        "/projects",
        "Projects",
        this.props.history,
        this.context
      );
      let api_data = {
        path: "/employee/createProject",
        method: "POST",
        user_token: token,
        body: {
          project_name: this.state.projectname,
          completion_date: this.state.targetdate,
          start_date: this.state.startdate,
          project_description: this.state.description,
          work_place_id: this.context.state.selected_department.work_place_id,
          other_data: {
            categories: this.state.categories,
            team_members: this.state.selected_members.data,
            admin_right: this.state.selected_lead.data,
          },
        },
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        this.context.set_projects(result.data.data);
        this.context.set_warning(
          true,
          "Succesfull",
          `Project ${this.state.projectname} successfully created`,
          "green",
          this.context
        );
        navigate(
          "push",
          "/projects",
          "Projects",
          this.props.history,
          this.context
        );
      } else {
        this.context.set_warning(
          true,
          "failed",
          result.data,
          "red",
          this.context
        );
      }
    } else {
      this.context.set_warning(
        true,
        "failed",
        "Please Select Department in which you want to create Project",
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
      this.state.selected.data[0] = items.work_place_id;
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

  display_fun_categories = (status) => {
    this.setState({ display_catgegories: status });
  };

  selected_fun_categories = (status, index, items) => {
    console.log("status, index,items: ", status, index, items);
    if (status === "add") {
      this.state.selected_categories.data[index] = items;
      this.state.selected_categories.length++;
      this.setState({
        selected_categories: this.state.selected_categories,
      });
    } else if (status === "new") {
      this.state.categories.unshift(items);
      this.state.selected_categories.data[0] = items;
      for (let i = 1; i < this.state.selected_categories.length; i++) {
        this.state.selected_categories.data[i + 1] =
          this.state.selected_categories.data[i];
      }
      this.state.selected_categories.length++;
      this.setState({
        selected_categories: this.state.selected_categories,
      });
    } else {
      delete this.state.selected_categories.data[index];
      this.state.selected_categories.length--;
      this.setState({ selected_categories: this.state.selected_categories });
    }
  };

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

  selected_lead = (members) => {
    this.state.selected_lead.data = {};
    for (let i = 0; i < members.length; i++) {
      this.state.selected_lead.data[i] = members[i].emp_id;
    }
    this.setState({
      selected_lead: this.state.selected_lead,
    });
  };

  input_handle_fun = (value) => {
    this.setState({ projectname: value });
  };

  handleDesc = (value) => {
    this.setState({ description: value });
  };

  handleStageName = (value) => {
    this.setState({ stageName: value });
  };

  handlePercentage = (value) => {
    this.setState({ stagePercentage: value });
  };

  deleteFields = (index) => {
    this.state.fields.splice(index, 1);
    this.setState({ fields: this.state.fields });
  };

  componentDidMount() {
    this.addField();
  }

  addField = () => {
    if (this.state.stageName !== "" && this.state.stagePercentage !== "") {
      let stage_data = {
        name: this.state.stageName,
        percentage: this.state.stagePercentage,
      };
      this.state.categories.push(stage_data);
    }
    this.setState({
      fields: [
        ...this.state.fields,
        <ReturnInput
          title="Enter Stage Name"
          fun={this.handleStageName}
          perfun={this.handlePercentage}
          index={this.state.fields.length}
          delfun={this.deleteFields}
        />,
      ],
    });
    this.setState({ stageName: "", stagePercentage: "" });
  };

  select_target_date = (data) => {
    this.setState({ targetdate: data });
  };

  select_start_date = (data) => {
    this.setState({ startdate: data });
  };

  render() {
    let Fields = this.state.fields.map((items) => {
      return items;
    });

    return (
      <div className="createproject_container">
        <div className="createproject_subcontainer">
          <div className="project_title">
            <CreateElementTitle
              title="Add Project Title"
              fun={this.input_handle_fun}
            />
          </div>
          <div className="project_dates">
            <div className="members_input">
              <h4>Select Start Date</h4>
              <CreateElementDate
                fun={this.select_start_date}
                date={this.state.startdate}
              />
            </div>
            <div className="members_input">
              <h4>Select End Date</h4>
              <CreateElementDate
                fun={this.select_target_date}
                date={this.state.targetdate}
              />
            </div>
          </div>
          <div className="project_members_and_lead">
            <div className="members_input">
              <h4>Select Team</h4>
              <CreateElementTeamInput
                fun={this.selected_fun_members}
                data={this.context.state.members}
              />
            </div>
            <div className="members_input">
              <h4>Select Project Lead</h4>
              <CreateElementProjectLeadInput
                data={this.context.state.members}
                fun={this.selected_lead}
              />
            </div>
          </div>

          <div className="project_stages_container">
            <h4>Add Stages</h4>
            {this.state.fields.map((items) => {
              return items;
            })}
            <span onClick={() => this.addField()}>Add Stages</span>
          </div>

          <div>
            <CreateElementDesc
              title="Add Description About Project"
              fun={this.handleDesc}
            />
          </div>
          <div className="create_project_btn">
            <Button
              fun={this.create_project}
              title="Create Project"
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

Createproject.contextType = AppContext;
