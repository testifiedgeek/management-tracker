import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Button from "../../reusable/button/button";
import "./projectplane.scss";

export default class Projectplan extends Component {
  createtask = () => {
    console.log("hello");
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
        <div className="plane_sections">
          <div className="plane_subsections">
            <h5>Categories</h5>
            <h5>Filter</h5>
          </div>
          <Button title="Create Task" fun={this.createtask} />
        </div>

        {/* Mobile View for categories */}
        <div className="plane_mobile_sections">
          <h5>Categories</h5>
        </div>
      </div>
    );
  }
}
