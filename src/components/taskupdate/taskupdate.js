import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Put_Updates from "../../reusable/putupdates/updates";
import search from "../../assets/search.svg";
import Commentcard from "../../reusable/commentcard/commentcard.js";
import AppContext from "../../context/AppContext";
import { Fetch_function } from "../../helperfunctions/fetchdata";

export default class Taskupdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_updates: "",
      write_update: false,
    };
  }

  async componentDidMount() {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    if (this.props.task_update_data.length === 0) {
      let api_data = {
        path: `/employee/createComment/NA/${this.context.state.task_overview_details.project_id}/${this.context.state.task_overview_details.task_id}`,
        method: "GET",
        user_token: token,
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        if (result.data.msg === "successful") {
          this.props.set_task_update_data(result.data.data[0].commentDetails);
        }
      } else {
        this.context.set_warning(
          true,
          "failed",
          result.data,
          "red",
          this.context
        );
      }
    }
  }

  render() {
    let searchdata;
    if (this.state.search_update !== "") {
      searchdata = this.props.task_update_data.filter((items) => {
        if (
          items.first_name
            .toLowerCase()
            .includes(this.state.search_updates.toLowerCase()) ||
          items.content
            .toLowerCase()
            .includes(this.state.search_updates.toLowerCase())
        ) {
          return items;
        }
      });
    }

    return (
      <div className="project_update_container">
        <div className="write_update_container">
          <Put_Updates
            add_new_comment={this.props.set_task_update_data}
            commentfor="Task"
            person={{
              name: this.context.state.user.name,
              profession: "Software Engineer",
            }}
          />
        </div>
        <br />
        <div className="header_container">
          <h5>Task Updates by Team</h5>
          <div class="search_container">
            <div class="search_subcontainer">
              <img src={search} />
              <input
                onChange={(e) =>
                  this.setState({ search_updates: e.target.value })
                }
                type="text"
                className="input_search"
                placeholder="Type to search tags and updates"
              />
            </div>
          </div>
        </div>

        {/* Mobile View Comments card rendering */}
        <div class="view_comment_cards">
          {this.state.search_updates === ""
            ? this.props.task_update_data.map((items) => {
                return <Commentcard commentdata={items} />;
              })
            : searchdata.map((items) => {
                return <Commentcard commentdata={items} />;
              })}
        </div>
      </div>
    );
  }
}

Taskupdates.contextType = AppContext;
