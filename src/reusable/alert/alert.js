import "./alert.scss";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const Alert = ({ fun, message, type, color }) => {
  const context = useContext(AppContext);
  return (
    <div className="alert_container">
      <div className="alert_subcontainer">
        <h3 className="alert_header">
          Rahul <span className="alert_msg">{message}</span>
        </h3>
        <div className="alert_btn">
          <button onClick={() => fun()}>{type}</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
