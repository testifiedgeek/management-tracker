import React, { useState, useContext } from "react";
import "./circlegenerator.scss";
import AppContext from "../../context/AppContext";
import Tooltip from "@material-ui/core/Tooltip";

const GenarateName = ({ id, name, width, height }) => {
  if (name) {
    console.log("name: ", name);
    let split_name = name.split(" ");
    if (split_name[0] && split_name[1]) {
      let shorname = split_name[0].split("")[0] + split_name[1].split("")[0];
      let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];

      return (
        <Tooltip title="Add" enterDelay={500} leaveDelay={200}>
          <div
            className="user_profile"
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
              width: width,
              height: height,
            }}
          >
            {shorname.toUpperCase()}
          </div>
        </Tooltip>
      );
    } else if (split_name[0]) {
      let shorname = split_name[0].split("")[0];
      let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];
      return (
        <div>
          <div
            className="user_profile"
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
            }}
          >
            {shorname.toUpperCase()}
          </div>
        </div>
      );
    }
  }
};

const GenarateNameForId = ({ id, width, height }) => {
  const context = useContext(AppContext);
  console.log("id: ", id, context.state.members);
  if (id) {
    let name = context.state.members.filter((items) => {
      if (items.emp_id === id) {
        return items;
      }
    });
    console.log("name", name);
    if (name[0]) {
      let split_name = name[0].first_name.split(" ");
      if (split_name[0] && split_name[1]) {
        let shorname = split_name[0].split("")[0] + split_name[1].split("")[0];
        let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];

        return (
          <div>
            <Tooltip
              title="Add"
              enterDelay={500}
              leaveDelay={200}
              className="user_profile"
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                width: width,
                height: height,
              }}
            >
              {shorname.toUpperCase()}
            </Tooltip>
          </div>
        );
      } else if (split_name[0]) {
        let shorname = split_name[0].split("")[0];
        let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];
        return (
          <Tooltip
            title="Add"
            enterDelay={500}
            leaveDelay={200}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="user_profile"
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
            >
              {shorname.toUpperCase()}
            </div>
            <span>{split_name[0]}</span>
          </Tooltip>
        );
      }
    }
  } else {
    return null;
  }
};

const GenarateNameForIdNotName = ({ id, width, height }) => {
  console.log("id: ", id);
  const context = useContext(AppContext);
  if (id) {
    let name = context.state.members.filter((items) => {
      if (items.emp_id === id) {
        return items.first_name;
      }
    });
    if (name[0]) {
      let split_name = name[0].first_name.split(" ");
      if (split_name[0] && split_name[1]) {
        let shorname = split_name[0].split("")[0] + split_name[1].split("")[0];
        let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];

        return (
          <div>
            <div
              className="user_profile"
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                width: width,
                height: height,
              }}
            >
              {shorname.toUpperCase()}
            </div>
          </div>
        );
      } else if (split_name[0]) {
        let shorname = split_name[0].split("")[0];
        let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="user_profile"
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
            >
              {shorname.toUpperCase()}
            </div>
          </div>
        );
      }
    }
  } else {
    return null;
  }
};

export { GenarateName, GenarateNameForId, GenarateNameForIdNotName };
