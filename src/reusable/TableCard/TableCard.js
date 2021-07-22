import React, { Component } from "react";
import "../TableCard/TableCard.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";
import navigate from "../../helperfunctions/navigation";
import { withRouter } from "react-router-dom";
import AppContext from "../../context/AppContext";
import ViewTeam from "../ViewTeam/ViewTeam";


export default class TableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  


  renderViewTask = () => {
    if (this.props.task === "true") {
      return (
        <td className="view_task" onClick={() => this.props.handleViewTask()}>
          View Task
        </td>
      );
    }
  };

  renderViewButton = () => {
    if(this.props.viewButton === "true") {
      
      return (
        
        <td className="view_button" onClick={() => this.props.handleViewButton()}>
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </td>
      )
    }
  }

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
                    if (newVal === "name" && this.props.fullName==="true") {
                      return (
                        <td key={id} className="table_heading">
                          
                        <div className="box_info_container">
                          <GenarateName name={val[newVal]} />
                          <h4>{val[newVal]}</h4>
                         </div>
                        </td>
                      );
                    }else if (newVal === "name" && this.props.fullName==="false") {
                      return (
                        <td key={id} className="table_heading">
                          <GenarateName name={val[newVal]} /> 
                        </td>
                      );
                    } 
                    else if (newVal === "name" && this.props.viewTeam==="true") {
                      return (
                        <td key={id} className="table_heading">
                          <ViewTeam info={TableData} /> 
                        </td>
                      );
                    } else{
                      return (
                        <td key={id} className="table_heading">
                          {val[newVal]}
                        </td>
                      );
                    }
                  })}
                  {this.renderViewTask()}
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
