import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import { GenarateName } from "../../reusable/namecirclegenerator/criclegenrator";
import "./profile.scss";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile_container">
        <div className="profile_subcontainer">
          <div className="heading_part">
            <GenarateName
              name={this.context.state.user.name}
              width={60}
              height={60}
            />
            <div style={{ marginLeft: 15 }}>
              <h3>{this.context.state.user.name}</h3>
              <div>
                <ion-icon name="briefcase"></ion-icon>{" "}
                {this.context.state.user.profession}
              </div>
              <div>
                <ion-icon name="people"></ion-icon> Innovation
              </div>
            </div>
          </div>

          <div className="profileinfo_part">
            <div>
              <h6>Email Id</h6>
              <span>{this.context.state.user.email}</span>
            </div>
            <div>
              <h6>Employee Id</h6>
              <span>{this.context.state.user.employeeid}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
