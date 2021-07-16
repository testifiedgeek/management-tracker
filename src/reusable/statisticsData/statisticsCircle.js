import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import stats from "../../assets/stats.svg";
import "./statustics.scss";
import navigate from "../../helperfunctions/navigation";

const ShowStats = (props) => {
  let { state, path, page, history, context } = props.navigation;
  let statsData = props.statsData;
  let statsTitle = statsData.map((items, index) => {
    return (
      <div key={index} className="stats_data">
        <div className="stats_data2">
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
    <div className="stats_container">
      <div className="stats_data_header">
        <h4>{props.title}</h4>
        {props.component === "Dashboard" ? (
          <label onClick={() => navigate(state, path, page, history, context)}>
            View all
          </label>
        ) : (
          <label></label>
        )}
      </div>
      <div className="stats_subcontainer">
        <div>
          <img alt="stats" src={stats} />
        </div>
        <div className="stats_data_container">{statsTitle}</div>
      </div>
    </div>
  );
};

export default ShowStats;
