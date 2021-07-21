import "./cardcomponent.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";
import complete_task from "../../assets/complete_task.svg";
import active_task from "../../assets/active_task.svg";
import navigate from "../../helperfunctions/navigation";

const Card = ({ content, navigation }) => {
  console.log("content: ", content);

  const navigate_ = (navigation) => {
    let { state, path, page, history, context } = navigation;
    navigate(state, path, page, history, context);
  };

  let card_content = content.map((items) => {
    return (
      <div onClick={() => navigate_(navigation)} className="card_container">
        <div className="card_subcontainer">
          <div className="card_top">
            <h6>{items.name}</h6>
            {items.task_status === "complete" ? (
              <img src={complete_task} />
            ) : (
              <img src={active_task} />
            )}
          </div>
          <div className="card_subcontainer2">
            <div className="card_center">
              <label>Start Date</label>
              <h6>{items.startDate}</h6>
            </div>
            <div className="card_center">
              <label>End Date</label>
              <h6>{items.endDate}</h6>
            </div>
          </div>
          <div className="card_subcontainer3">
            <h5>View task</h5>
          </div>
        </div>
      </div>
    );
  });

  return card_content;
};

const Workspacecard = ({ content, navigation }) => {
  const navigate_ = (navigation) => {
    let { state, path, page, history, context } = navigation;
    navigate(state, path, page, history, context);
  };

  let card_content = content.map((items) => {
    return (
      <div onClick={() => navigate_(navigation)} className="card_container">
        <div className="card_subcontainer">
          <div className="card_top">
            <h6>{items.name}</h6>
            <ion-icon name="ellipsis-vertical"></ion-icon>
          </div>
          <div className="card_subcontainer2">
            <div className="card_center">
              <label>Created by</label>
              <h6>{GenarateName({ name: "Rahul Darekar" })}</h6>
            </div>
            <div className="card_center">
              <label>Created on</label>
              <h6>{items.endDate}</h6>
            </div>
          </div>
          <div className="card_subcontainer3">
            <h5>View Group</h5>
          </div>
        </div>
      </div>
    );
  });

  return card_content;
};

export { Card, Workspacecard };
