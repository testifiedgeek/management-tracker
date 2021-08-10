import React, { Component } from "react";
import "../TableCard/TableCard.scss";
import {
  GenarateName,
  GenarateNameForId,
} from "../namecirclegenerator/criclegenrator";
import navigate from "../../helperfunctions/navigation";
import { withRouter } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Alert from "../alert/alert";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import StatusBtn from "../taskstatus_button/statusbutton";
import current_date from "../../helperfunctions/datemodule";

export default class TableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderViewTask = (id) => {
    if (this.props.task === "true") {
      return (
        <td
          className="table_heading_button"
          onClick={() => this.props.handleViewTask(id)}
        >
          View Task
        </td>
      );
    }
  };

  returnWorkspace = (id) => {
    console.log("id: ", id);
    let dept = this.context.state.departments.filter((dep) => {
      if (dep.work_place_id === id) {
        return dep;
      }
    });
    console.log("dept", dept);
    if (dept[0]) return dept[0].work_place_name;
  };

  renderProjectView = (name, id) => {
    return (
      <label
        className="table_heading_button"
        onClick={() => this.props.handleViewTask(id)}
      >
        {name}
      </label>
    );
  };

  renderTaskView = (name, id) => {
    return (
      <label
        className="table_heading_button"
        onClick={() => this.props.handleViewTask(id)}
      >
        {name}
      </label>
    );
  };

  renderViewButton = () => {
    if (this.props.viewButton === "true") {
      return (
        <td
          className="table_heading"
          onClick={() => this.props.handleViewButton()}
        >
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </td>
      );
    }
  };

  checkDeadLine = (date) => {
    console.log("current_date", current_date);
    let compare = current_date.split("-");
    if (
      compare[0] >= date.split("-")[0] &&
      compare[1] >= date.split("-")[1] &&
      compare[2] > date.split("-")[2]
    ) {
      return <span style={{ fontWeight: "bold", color: "red" }}>{date}</span>;
    }
    return date;
  };

  render() {
    let TableData = this.props.content;
    console.log("TableData: ", this.props.handle, this.props);
    let TableTitle = this.props.title;
    let TableRow = this.props.rows;
    let TableHeading = this.props.headings;
    let Numbers = this.props.serial;
    let table_status = this.props.table_status;

    if (Numbers === "true") {
      return (
        <table className="user_container">
          <caption id="table_caption">
            {TableTitle} {table_status ? table_status : ""}
          </caption>
          <thead>
            <tr className="table_row" id="heading">
              <th className="table_heading">Sl.No</th>
              {TableHeading.map((head, key) => {
                return (
                  <th key={key} className="table_heading">
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TableData.map((val, key) => {
              return (
                <tr className="table_row" key={key}>
                  <td className="table_heading">{key + 1}</td>
                  {TableRow.map((newVal, id) => {
                    // let assigned_to = this.context.state.members.filter(
                    //   (users) => {
                    //     if (users.emp_id === val[newVal]) {
                    //       return (
                    //         <GenarateName
                    //           name={users.first_name + " " + users.last_name}
                    //         />
                    //       );
                    //     }
                    //   }
                    // );

                    if (newVal === "name") {
                      return (
                        <td key={id} className="table_heading">
                          {" "}
                          <GenarateName name={val["project_name"]} />
                        </td>
                      );
                    } else {
                      return (
                        <td key={id} className="table_heading">
                          {newVal === "final_status" ? (
                            <StatusBtn
                              userId={this.context.state.user.employeeid}
                              task={val}
                              fun={this.props.handleClickTaskStatus}
                            />
                          ) : newVal === "start_date" ? (
                            val[newVal].split("T")[0]
                          ) : newVal === "completion_date" ? (
                            this.checkDeadLine(val[newVal].split("T")[0])
                          ) : newVal === "project_name" ? (
                            this.renderProjectView(val[newVal], val)
                          ) : newVal === "task_name" ? (
                            this.renderTaskView(val[newVal], val)
                          ) : newVal === "created_by" ||
                            newVal === "assigned_to" ? (
                            <GenarateNameForId id={val[newVal]} />
                          ) : newVal === "work_place_id" ? (
                            this.returnWorkspace(val[newVal])
                          ) : newVal === "task_percentage" ? (
                            window.parseInt(val[newVal]) + "%"
                          ) : newVal === "completion_date" ? (
                            this.checkDeadLine(val[newVal])
                          ) : (
                            val[newVal]
                          )}
                        </td>
                      );
                    }
                  })}

                  {this.renderViewTask(val)}
                  {this.renderViewButton()}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className="user_container">
          <caption id="table_caption">{TableTitle}</caption>
          <thead>
            <tr className="table_row" id="heading">
              {TableHeading.map((head, key) => {
                return (
                  <th key={key} className="table_heading">
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TableData.map((val, key) => {
              return (
                <tr className="table_row" key={key}>
                  {TableRow.map((newVal, id) => {
                    if (newVal === "name") {
                      return (
                        <td key={id} className="table_heading">
                          {" "}
                          <GenarateName name={val[newVal]} />
                        </td>
                      );
                    } else {
                      return (
                        <td key={id} className="table_heading">
                          {val[newVal]}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

TableCard.contextType = AppContext;
