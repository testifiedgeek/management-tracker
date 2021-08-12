import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import stats from "../../assets/stats.svg";
import "./statisticsCard.scss";
import navigate from "../../helperfunctions/navigation";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class StatsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 80,
    };
  }
  render() {
    let { state, path, page, history, context } = this.props.navigation;
    let statsData = this.props.statsData;
    let statsTitle = statsData.map((items, index) => {
      return (
        <div key={index} className="statscard_data">
          <div className="statscard_data2">
            <div
              style={{
                backgroundColor: items.color,
                width: 5,
                height: 5,
                borderRadius: 100,
                padding: 3,
                marginRight: 8,
              }}
            ></div>
            <label>{items.title}</label>
          </div>
          <label>{items.percentage}</label>
        </div>
      );
    });
    return (
      <div className="statscard_container">
        {/* <div className="stats_data_header">
        <h4>{props.title}</h4>
        {props.component === "Dashboard" ? (
          <label onClick={() => navigate(state, path, page, history, context)}>
            View all
          </label>
        ) : (
          <label></label>
        )}
      </div> */}
        <div className="statscard_subcontainer">
          <div className="dynamic_progress">
            <CircularProgressbar
              value={this.state.percentage}
              text={`${this.state.percentage}%`}
              styles={buildStyles({
                textColor: "black",
                pathColor: "green",
                trailColor: "red",
              })}
              strokeWidth={13}
            />
          </div>
          <div className="statscard_data_container">{statsTitle}</div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
