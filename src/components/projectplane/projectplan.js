import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";

export default class Projectplan extends Component {
  render() {
    return (
      <div>
        <div className="respresent_data">
          <ShowStats
            statsData={[
              { color: "blue", title: "Active", percentage: "20%" },
              { color: "red", title: "Inprogress", percentage: "80%" },
            ]}
          />
          <Infoboxes
            info={[
              { title: "Project Lead", name: "Abhishek Badjatiya" },
              { title: "Status", name: "In Progress" },
            ]}
          />
        </div>
      </div>
    );
  }
}
