import "./cardcomponent.scss";
import { GenarateName } from "../namecirclegenerator/criclegenrator";
import complete_task from "../../assets/complete_task.svg";
import active_task from "../../assets/active_task.svg";
import navigate from "../../helperfunctions/navigation";

const Card = ({ content, navigation }) => {
  console.log("content: ", content);

  const navigate_ = (navigation, items) => {
    let { state, path, page, history, context } = navigation;
    context.setproject_overview(items);
    navigate(state, path, page, history, context);
  };

  let card_content = content.map((items) => {
    let creator = navigation.context.state.members.map((user, index) => {
      if (user.emp_id === items.created_by) {
        return (
          <div key={index} className="project_creator">
            <GenarateName name={user.first_name + " " + user.last_name} />
            <span>{user.first_name + " " + user.last_name}</span>
          </div>
        );
      }
    });
    return (
      <div className="card_container">
        <div className="card_subcontainer">
          <div className="card_top">
            <h6>{items.project_name}</h6>
            {creator}
          </div>
          <div className="card_subcontainer2">
            <div className="card_center">
              <label>Start Date</label>
              <h6>
                {items.start_date
                  ? items.start_date.split("T")[0]
                  : "Not Mentioned"}
              </h6>
            </div>
            <div className="card_center">
              <label>End Date</label>
              <h6>
                {items.completion_date
                  ? items.completion_date.split("T")[0]
                  : "Not Mentioned"}
              </h6>
            </div>
          </div>
          <div className="card_subcontainer3">
            <h5 onClick={() => navigate_(navigation, items)}>View Project</h5>
          </div>
        </div>
      </div>
    );
  });

  return card_content;
};

const TaskCard = ({ content, navigation }) => {
  console.log("content: ", content);

  const navigate_ = (navigation) => {
    let { state, path, page, history, context } = navigation;
    navigate(state, path, page, history, context);
  };

  let card_content = content.map((items) => {
    return (
      <div className="card_container">
        <div className="card_subcontainer">
          <div className="card_top">
            <h6>{items.task_name}</h6>
            {items.is_active === 1 ? (
              <img src={active_task} />
            ) : (
              <img src={complete_task} />
            )}
          </div>
          <div className="card_subcontainer2">
            <div className="card_center">
              <label>Start Date</label>
              <h6>{items.start_date}</h6>
            </div>
            <div className="card_center">
              <label>End Date</label>
              <h6>{items.completion_date.split("T")[0]}</h6>
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

export { Card, Workspacecard, TaskCard };
