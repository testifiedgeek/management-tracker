import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Button from "../../reusable/button/button";
import Createtask from "../createtasks/createtasks";
import "./projectplane.scss";
import navigate from "../../helperfunctions/navigation";
import AppContext from "../../context/AppContext";

export default class Projectplan extends Component {
  create_task = () => {
    navigate(
      "push",
      "/project-overview",
      "Create Task",
      this.props.history,
      this.context
    );
  };

  render() {
    return (
      <div>
        <div className="respersent_data_container">
          <div className="stats_represantation">
            <ShowStats
              navigation={{
                state: "push",
                path: "/project-overview",
                page: "Project Overview",
                history: this.props.history,
                context: this.context,
              }}
              title="Project Status"
              statsData={[
                { color: "blue", title: "Active", percentage: "20%" },
                { color: "red", title: "Inprogress", percentage: "80%" },
              ]}
            />
          </div>
          <div className="info_represantation">
            <Infoboxes
              info={[
                { title: "Project Lead", name: "Abhishek Badjatiya" },
                { title: "Status", name: "In Progress" },
              ]}
            />
          </div>
        </div>

        {/* Web View for categories */}
        {this.context.state.page === "Create Task" ? (
          <div className="create_task">
            <Createtask />
          </div>
        ) : (
          <div className="plane_sections">
            <div className="plane_subsections">
              <h5>Categories</h5>
              <h5>Filter</h5>
            </div>
            <Button title="Create Task" fun={this.create_task} />
          </div>
        )}

        {/* Mobile View for categories */}
        <div className="plane_mobile_sections">
          <h5>Categories</h5>
        </div>
      </div>
    );
  }
}

Projectplan.contextType = AppContext;
