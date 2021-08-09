import React, { Component } from "react";
import "../DisplayGroup/displayGroup.scss";
import RepresentData from "../../reusable/textinfo/textdata";
import Projectplan from "../projectplane/projectplan";
import Projectupdates from "../projectupdates/projectupdates";
import AppContext from "../../context/AppContext";
import Taskplane from "../../components/taskoverview/taskoverveiw";
import Taskupdates from "../../components/taskupdate/taskupdate";
import complete from "../../assets/complete.svg";
import start from "../../assets/complete.svg";

export default class DisplayGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "project_plan",
      task_update_data: [],
    };
  }

  set_task_update_data = (data) => {
    console.log("data: ", data);
    this.setState({
      task_update_data: [...this.state.task_update_data, ...data],
    });
  };

  render() {
    return (
      <div>
        <div className="project_overview_container">
          <div className="represent_data">
            <RepresentData
              infodata={{
                title: this.context.state.task_overview_details.task_name,
                desc: this.context.state.task_overview_details.task_description,
                startDate: this.context.state.task_overview_details.start_date,
                endDate:
                  this.context.state.task_overview_details.completion_date,
              }}
            />
            {/* {this.context.state.task_overview_details.is_active === 2 ?
            <img src={start} />
             :
             (this.context.state.task_overview_details.is_active === 1 ?
             <img src={start} />
              :
              <img src={complete} />
             )}  */}
          </div>

          {/* <div className="tabs_section">
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
              </div> */}
        </div>
        {/* Render Child Components on the basis of above conditions */}
        {/* <Projectplan history={this.props.history} /> */}
        <Taskplane history={this.props.history} />
        <Taskupdates
          set_task_update_data={this.set_task_update_data}
          task_update_data={this.state.task_update_data}
        />
      </div>
    );
  }
}

DisplayGroup.contextType = AppContext;
