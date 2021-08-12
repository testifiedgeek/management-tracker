import React, { Component } from "react";
import "./displaydepartment.scss";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import current_date from "../../helperfunctions/datemodule";

class Departements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return <div className="dep_main_container"></div>;
  }
}

export default Departements;
