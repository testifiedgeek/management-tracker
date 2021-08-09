import React, { Component } from "react";
import search from "../../assets/search.svg";
import {
  Card,
  Workspacecard,
} from "../../reusable/cardcomponent/CardComponent";
import WorkspaceCard from "../../reusable/workspacecard/workspacecard";
import AppContext from "../../context/AppContext";
import "./workspace.scss";
import Creategroups from "../creategroups/creategropus";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import TableCard from "../../reusable/TableCard/TableCard";
import Popup from "../../reusable/Popup/Popup";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import DisplayGroup from "../DisplayGroup/displayGroup";

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_group: "",
      display_departments: false,
      selected_department: { name: "", id: "" },
      content: [
        {
          srno: 1,
          title: "Policy maker",
          name: "Policy maker",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
          task_status: "complete",
        },
        {
          srno: 1,
          title: "Kompass",
          name: "Kompass ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "sampoorna Suraksha",
          name: "sampoorna Suraksha",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "BPR Inovation",
          name: "BPR Inovation ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
      ],
      seen: false,
    };
  }

  searchit = () => {
    let searched_result;
    if (this.state.search_group !== "") {
      searched_result = this.state.content.filter((items) => {
        if (
          items.name
            .toLowerCase()
            .includes(this.state.search_group.toLowerCase())
        ) {
          return items;
        }
      });
    }
    return searched_result;
  };

  create_new_group = async () => {
    navigate(
      "push",
      "/create-group",
      "Create Workspace",
      this.props.history,
      this.context
    );

    let api_data = {
      path: "/admin/createWorkSpace",
      method: "POST",
      body: {},
    };
    let result = await Fetch_function(api_data);
    if (result) {
      if (result.msg === "work space created successfully") {
        this.context.set_warning(
          true,
          "Succesfull",
          `Work Space ${this.state.groupname} Created Successfully1`,
          "green",
          this.context
        );
      } else if (result.msg === "Something Went Wrong") {
        this.context.set_warning(
          true,
          "failed",
          "Something Went Wrong",
          "red",
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

  create_new_group_popup = () => {
    this.setState({ seen: !this.state.seen });
    return 0;
  };

  // async componentDidMount() {
  //   // Fetch All Departements in managements tracker

  //   let api_data = {
  //     path: "/tasks",
  //     method: "POST",
  //     body: {
  //       // employeeId:employeeid,
  //       // password
  //     },
  //   };
  //   let result = await Fetch_function(api_data);
  //   if (result) {
  //     if (result.msg === "work space created successfully") {
  //       this.context.set_warning(
  //         true,
  //         "Succesfull",
  //         `Work Space ${this.state.groupname} Created Successfully1`,
  //         "green",
  //         this.context
  //       );
  //     }  else if (result.msg === "Something Went Wrong") {
  //       this.context.set_warning(
  //         true,
  //         "failed",
  //         "Something Went Wrong",
  //         "red",
  //         this.context
  //       );
  //     }
  //   } else {
  //     this.context.set_warning(
  //       true,
  //       "failed",
  //       "Something Went Wrong",
  //       "red",
  //       this.context
  //     );
  //   }
  // }

  render() {
    return (
      <div className="workspace_container">
        {/* Work space Web container */}

        <div>
          {this.context.state.page !== "Create Group" ? (
            <div className="main_workspace_web_container">
              <h3>All Groups</h3>
              <div class="search_container">
                <div class="search_subcontainer">
                  <img src={search} />
                  <input
                    onChange={(e) =>
                      this.setState({ search_project: e.target.value })
                    }
                    type="text"
                    className="input_search"
                    placeholder="Type to search project"
                  />
                  <span>Sort By</span>
                </div>
              </div>
              <div className="create_group_btn">
                <Button title="Create Workspace" fun={this.create_new_group} />
              </div>
            </div>
          ) : (
            <div className="project_createsection">
              <Creategroups />
            </div>
          )}
          {/* Statistics Slide */}
          {/* <div className='gropu_table_container'>
             <DisplayGroup />
          </div> */}
        </div>

        {/* Workspace Mobile container */}

        <div className="main_projects_mobile_container">
          <div class="search_container">
            <div class="search_subcontainer">
              <img src={search} />
              <input
                onChange={(e) =>
                  this.setState({ search_group: e.target.value })
                }
                type="text"
                className="input_search"
                placeholder="Type to search Group"
              />
            </div>
          </div>
        </div>

        <div className="workspace_grid_system">
          {this.context.state.departments.map((items) => {
            return (
              <WorkspaceCard img="" name={items.work_place_name} members={32} />
            );
          })}
        </div>

        {/* {this.context.state.page !== "Create Group" ? (
          <div className="web_view_departmentdisplay">
            <div className="depatments_display">
              <div
                onClick={() =>
                  this.state.display_departments === false
                    ? this.setState({ display_departments: true })
                    : this.setState({ display_departments: false })
                }
                className="department_selection"
              >
                <label>
                  {this.state.selected_department.name === ""
                    ? "Select Department"
                    : this.state.selected_department.name}
                </label>
                {this.state.display_departments ? (
                  <ion-icon name="caret-up"></ion-icon>
                ) : (
                  <ion-icon name="caret-down"></ion-icon>
                )}
              </div>
              {this.state.display_departments ? (
                <div className="drop_down_departments">
                  {this.context.state.departments.map((items) => {
                    return (
                      <p
                        onClick={() =>
                          this.setState(
                            {
                              selected_department: {
                                name: items.work_place_name,
                                id: items.work_place_id,
                              },
                              display_departments: false,
                            },
                            () => {
                              this.context.setDept(items.work_place_id);
                            }
                          )
                        }
                      >
                        {items.work_place_name}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )} */}

        {/* <div>
          {this.state.seen ? <Popup 
            content={(
            <div><Creategroups /></div>
          )}
          handleClose={this.create_new_group_popup}
          /> : null}
        </div> */}

        {/* Workspace Web view tables */}
        {/* <div className="web_view_gropudatacontainer">
          <TableCard
            title=""
            content={[
              {
                pr_name: "Sampoorn Suraksha",
                team: "Innovation",
                status: "Completed",
                name: "Mayur Dere",
                st_date: "22/07/2021",
                tg_date: "27/07/2021",
              },
              {
                pr_name: "Super Topup",
                team: "Innovation",
                status: "Incomplete",
                name: "Mayur Dere",
                st_date: "22/07/2021",
                tg_date: "27/07/2021",
              },
              {
                pr_name: "PYP Journey",
                key2: "wow",
                status: "incompleted",
                team: "Innovation",
                name: "Mayur Dere",
                st_date: "22/07/2021",
                tg_date: "27/07/2021",
              },
            ]}
            rows={["pr_name", "name"]}
            headings={["Group Name", "Team Members", ""]}
            serial="true"
            viewButton="true"
            handleViewButton={this.create_new_group}
          />
        </div> */}

        {/* Workspace mobile card view */}

        <div className="mobile_view_gropudatacontainer">
          <div className="depatments_display">
            <div
              onClick={() =>
                this.state.display_departments === false
                  ? this.setState({ display_departments: true })
                  : this.setState({ display_departments: false })
              }
              className="department_selection"
            >
              <label>
                {this.state.selected_department.name === ""
                  ? "Select Department"
                  : this.state.selected_department.name}
              </label>
              {this.state.display_departments ? (
                <ion-icon name="caret-up"></ion-icon>
              ) : (
                <ion-icon name="caret-down"></ion-icon>
              )}
            </div>
            {this.state.display_departments ? (
              <div className="drop_down_departments">
                {this.context.state.departments.map((items) => {
                  return (
                    <p
                      onClick={() =>
                        this.setState({
                          selected_department: {
                            name: items.work_place_name,
                            id: items.work_place_id,
                          },
                          display_departments: false,
                        })
                      }
                    >
                      {items.work_place_name}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="mobile_view_subgropudatacontainer">
            <Workspacecard
              content={
                this.state.search_group !== ""
                  ? this.searchit()
                  : this.state.content
              }
              navigation={{
                state: "push",
                path: "/group-overview",
                page: "Group Overview",
                history: this.props.history,
                context: this.context,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Workspace.contextType = AppContext;
