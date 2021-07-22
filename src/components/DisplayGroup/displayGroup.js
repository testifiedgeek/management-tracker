import React, { Component } from 'react'
import '../DisplayGroup/displayGroup.scss'
import RepresentData from '../../reusable/textinfo/textdata';
import Projectplan from '../projectplane/projectplan';
import Projectupdates from '../projectupdates/projectupdates';
import AppContext from '../../context/AppContext';

export default class DisplayGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tab: "project_plan",
        };
      }
      render() {
        return (
          <div>
            <div className="project_overview_container">
              <div className="represent_data">
                <RepresentData
                  infodata={{
                    title: "Sampoorn Sooraksha",
                    startDate: "12/01/2020",
                    endDate: "09/12/2021",
                  }}
                />
              </div>
    
              <div className="tabs_section">
                <span
                  onClick={() =>
                    this.setState({ tab: "project_plan" }, () =>
                      this.context.set_page("Project Overview")
                    )
                  }
                >
                  {this.state.tab === "project_plan" ? (
                    <span className="active_project_plan">PROJECT PLANES</span>
                  ) : (
                    <span className="inactive_project_plan">PROJECT PLANES</span>
                  )}
                </span>
                <span
                  onClick={() =>
                    this.setState({ tab: "project_updates" }, () =>
                      this.context.set_page("Write Update")
                    )
                  }
                >
                  {this.state.tab === "project_updates" ? (
                    <span className="active_project_plan">PROJECT UPDATES</span>
                  ) : (
                    <span className="inactive_project_plan">PROJECT UPDATES</span>
                  )}
                </span>
              </div>
            </div>
            {/* Render Child Components on the basis of above conditions */}
    
            {this.state.tab === "project_plan" ? (
              <Projectplan history={this.props.history} />
            ) : (
              <Projectupdates />
            )}
          </div>
        );
      }
}

DisplayGroup.contextType = AppContext;

