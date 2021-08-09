import React, { Component } from "react";
import "./createproject.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
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
          work_place_id: this.context.state.selected_department,
          other_data: {
            categories: this.state.categories,
            team_members: this.state.selected_members.data,
            admin_right: this.state.selected_lead.data,
          },
        },
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        this.props.add_new_created_project(result.data.data);
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

  selected_fun_members = (status, index, items) => {
    console.log("status, index,items: ", status, index, items);
    if (status === "add") {
      this.state.selected_members.data[index] = items.emp_id;
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
      this.state.selected_lead.data[index] = items.emp_id;
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
    this.setState({ projectname: value });
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
        <div>
          <div className="createproject_subcontainer">
            <div className="section3">
              <Createsection
                label="Unique Project Name"
                type="input"
                input_handle_fun={this.input_handle_fun}
              />
            </div>
            <div className="section3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  value={this.state.startdate}
                  onChange={this.select_start_date}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="section3">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  value={this.state.targetdate}
                  onChange={this.select_target_date}
                />
              </MuiPickersUtilsProvider>
            </div>
            {/* <div className="section1">
              <Createsection
                label="Select Department"
                searchtitle="Search Team Name Here"
                type="dropdown"
                data={this.context.state.departments}
                selected={this.state.selected}
                display={this.state.display}
                display_fun={this.display_fun}
                selected_fun={this.selected_fun}
              />
            </div> */}
            <div className="section1">
              <Createsection
                label="Select Members"
                searchtitle="Search Team Name Here"
                type="dropdown"
                data={this.context.state.members}
                selected={this.state.selected_members}
                display={this.state.display_members}
                display_fun={this.display_fun_members}
                selected_fun={this.selected_fun_members}
              />
            </div>
            {/* <div className="section4">
              <Createsection
                label="Select Categories"
                searchtitle="Search Team Name Here"
                data={this.context.state.categories}
                type="dropdown"
                selected={this.state.selected_categories}
                display={this.state.display_catgegories}
                display_fun={this.display_fun_categories}
                selected_fun={this.selected_fun_categories}
              />
            </div> */}

            <div className="section5">
              <Createsection
                label="Select Project Lead"
                searchtitle="Search Name Here"
                data={this.context.state.members}
                type="dropdown"
                selected={this.state.selected_lead}
                display={this.state.display_lead}
                display_fun={this.display_lead}
                selected_fun={this.selected_lead}
              />
            </div>
          </div>

          {/* Create Categories section */}
          <div className="create_categories">
            <h3 className="stage_label">Stages</h3>
            <div className="create_subcategories">
              {/* <ReturnInput title='Enter Stage Name' fun={this.handleStageName} perfun={this.handlePercentage} />
                <ReturnInput title='Enter Stage Name' fun={this.handleStageName} perfun={this.handlePercentage} />
                <ReturnInput title='Enter Stage Name' fun={this.handleStageName} perfun={this.handlePercentage} /> */}
              {Fields}
            </div>
            {this.state.stageName !== "" &&
            this.state.stagePercentage !== "" ? (
              <h3 onClick={() => this.addField()} style={{ color: "#2541b2" }}>
                Add Stages
              </h3>
            ) : (
              <div></div>
            )}
          </div>

          <textarea
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Write Something Here..."
            className="desc"
          ></textarea>
          <div className="create_project_button">
            {this.state.projectname !== "" &&
            this.state.targetdate !== "" &&
            this.state.description !== "" &&
            this.state.selected_members[0] &&
            this.state.selected_categories[0] &&
            this.state.selected_lead[0] &&
            this.state.selected[0] ? (
              <Button
                title="Create Project"
                width={"100%"}
                fun={this.create_project}
              />
            ) : (
              <Button
                title="Create Project"
                width={"100%"}
                fun={this.create_project}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Createproject.contextType = AppContext;
