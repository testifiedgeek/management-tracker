import React, { Component } from 'react'
import '../DisplayGroup/displayGroup.scss'
import RepresentData from '../../reusable/textinfo/textdata';
import Projectplan from '../projectplane/projectplan';
import Projectupdates from '../projectupdates/projectupdates';
import AppContext from '../../context/AppContext';
import TodoList from '../../reusable/createSubtask';

export default class DisplayGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tab: "group_chat",
        };
      }
      render() {
        return (
          <div>
            <div className="display_group_container">
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
                    this.setState({ tab: "group_chat" }, () =>
                      this.context.set_page("Group")
                    )
                  }
                >
                  {this.state.tab === "group_chat" ? (
                    <span className="active_group_chat">Chat</span>
                  ) : (
                    <span className="inactive_group_chat">Chat</span>
                  )}
                </span>
                <span
                  onClick={() =>
                    this.setState({ tab: "group_tasks" }, () =>
                      this.context.set_page("View Task")
                    )
                  }
                >
                  {this.state.tab === "group_tasks" ? (
                    <span className="active_group_chat">Task</span>
                  ) : (
                    <span className="inactive_group_chat">Task</span>
                  )}
                </span>
              </div>
            </div>
            {/* Render Child Components on the basis of above conditions */}
    
            {this.state.tab === "group_chat" ? (
              <Projectupdates />
            ) : (
              <TodoList />
            )}
          </div>
        );
      }
}

DisplayGroup.contextType = AppContext;

