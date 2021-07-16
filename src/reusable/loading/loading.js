import React from "react";
import "./loading.scss";

export default function Loading({ msg }) {
  return (
    <div className="loading_container">
      <div className="loading_subcontainer">
        <div>
          <div className="loading_squares">
            <div className="sqaure"></div>
            <div className="sqaure2"></div>
          </div>
          <div className="loading_squares">
            <div className="sqaure3"></div>
            <div className="sqaure4"></div>
          </div>
          <br />
          <div>
            <h5>Please Wait...</h5>
            <span>{msg || "Tetsing is available"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
