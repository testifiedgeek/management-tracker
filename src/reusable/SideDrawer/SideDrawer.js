import React, { Component } from "react";
import SideDrawerBar from "../SideDrawerItems/SideDrawerBar";
import ProjectOverview from "../../components/projectoverview/ProjectOverview";
import "../SideDrawer/SideDrawer.scss";

export default class SideDrawer extends Component {
  state = {
    sidebarOpen: false,
  };
  handleViewSidebar = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen });

  render() {
    return (
      <div className="remaining_page" id="remaining_page">
        <SideDrawerBar
          isOpen={this.state.sidebarOpen}
          toggleSidebar={this.handleViewSidebar}
        />

        <ProjectOverview
          isOpen={this.state.sidebarOpen}
          data={{
            title: "UI Design",
            startDate: "12/01/2020",
            endDate: "09/12/2021",
          }}
        />
      </div>
    );
  }
}
