import React, { Component } from "react";
import "./createproject.scss";
import AppContext from "../../context/AppContext";
import { Createsection } from "../../reusable/creationprocess/Createsection";
import Button from "../../reusable/button/button";

export default class Createproject extends Component {
  create_project = () => {};
  render() {
    return (
      <div className="createproject_container">
        <div className="createproject_subcontainer">
          <Createsection />
          <Createsection />
          <Createsection />
          <Createsection />
          <div className="create_project_button">
            <Button
              title="Create Project"
              width={"90%"}
              fun={this.create_project}
            />
          </div>
        </div>
      </div>
    );
  }
}

Createproject.contextType = AppContext;
