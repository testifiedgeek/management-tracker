import React, { useContext } from "react";
import "./statusbutton.scss";
import AppContext from "../../context/AppContext";

const StatusBtn = ({ userId, task, fun }) => {
  console.log("fun: ", fun);
  const context = useContext(AppContext);
  let taskstatus = task.final_status;
  if (task.assigned_to == parseInt(userId)) {
    if (taskstatus === 0) {
      return (
        <div className="accept_task_button">
          <button onClick={() => context.accept_task(userId, task, fun)}>
            Click To Accept
          </button>
        </div>
      );
    } else if (taskstatus === 1) {
      return (
        <div className="complete_task_button">
          <button onClick={() => context.complete_task(userId, task, fun)}>
            Click To Complete
          </button>
        </div>
      );
    } else if (taskstatus === 2) {
      return (
        <div className="complete_task_button">
          <button>Completed</button>
        </div>
      );
    }
  } else {
    if (taskstatus === 0) {
      return (
        <div className="accept_task_status">
          <span>Not Accepted Yet</span>
        </div>
      );
    } else if (taskstatus === 1) {
      return (
        <div className="progress_task_status">
          <span>Task In Progress</span>
        </div>
      );
    } else if (taskstatus === 2) {
      return (
        <div className="complete_task_status">
          <span>Task Is Completed</span>
        </div>
      );
    }
  }
};

export default StatusBtn;
