import "./projectcard.scss";
import React, { useContext } from "react";
import {
  GenarateName,
  GenarateNameForId,
} from "../namecirclegenerator/criclegenrator";
import AppContext from "../../context/AppContext";
import innovation2 from "../../assets/innovation2.svg";

const ProjectCard = ({ content, handleViewTask }) => {
  const context = useContext(AppContext);
  const returnWorkspace = (id) => {
    let dept = context.state.departments.filter((dep) => {
      if (dep.work_place_id === id) {
        return devicePixelRatio;
      }
    });
    console.log("dept", dept);
    if (dept[0]) return dept[0].work_place_name;
  };

  return (
    <div
      onClick={() => handleViewTask(content)}
      className="projects_card_container"
    >
      <div className="projects_card_subcontainer">
        <div className="card_top">
          <div className="card_top_item">
            <img src={innovation2} />
          </div>
          <div className="card_top_item">
            {returnWorkspace(content.work_place_id).toLowerCase()}
          </div>
        </div>
        <div className="card_bottom">
          <div className="bottom_top">
            <h4>{content.project_name}</h4>
            <h5 className="status">
              {content.final_status == 0 ? "In Progress" : "Completed"}
            </h5>
          </div>
          <div className="bottom_middle">
            <div>
              <label className="date_label">Start Date</label>
              <div className="date">{content.start_date.split("T")[0]}</div>
            </div>
            <div>
              <label className="date_label">Target Date</label>
              <div className="date">
                {content.completion_date.split("T")[0]}
              </div>
            </div>
          </div>
          <div className="bottom_bottom">
            <div>
              <label>Project Lead</label>
              <div className="info_box">
                <div>
                  <GenarateNameForId id={content.created_by} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
