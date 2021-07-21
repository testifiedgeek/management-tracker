import React, { Component } from "react";
import "../TableCard/TableCard.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";

import { withRouter } from "react-router-dom";

export default class TableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleViewtask = () => {
    console.log("view clicked");
  };

  renderViewTask = () => {
    if (this.props.task === "true") {
      return (
        <td className="table_heading" onClick={this.handleViewtask}>
          View Task
        </td>
      );
    }
  };

  render() {
    let TableData = this.props.content;
    let TableTitle = this.props.title;
    let TableRow = this.props.rows;
    let TableHeading = this.props.headings;
    let Numbers = this.props.serial;

    if (Numbers === "true") {
      return (
        <table className="user_container">
          <caption id="table_caption">{TableTitle}</caption>
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
                  {this.renderViewTask()}
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
