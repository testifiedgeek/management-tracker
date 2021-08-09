import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Put_Updates from "../../reusable/putupdates/updates";
import search from "../../assets/search.svg";
import "./projectupdates.scss";
import Commentcard from "../../reusable/commentcard/commentcard.js";
import AppContext from "../../context/AppContext";
import { Fetch_function } from "../../helperfunctions/fetchdata";

let testing = [
  {
    author: "Abhisheck",
    date: "12/09/2021",
    time: "12.48 pm",
    comment: "@Rahuld Hey Rahul We Need To Intergrate this as soon as possible",
  },
  {
    author: "Mayur Dere",
    date: "12/09/2021",
    time: "12.48 pm",
    comment:
      "@mayur dere Hey Rahul We Need To Intergrate this as soon as possible",
  },
  {
    author: "priya d",
    date: "12/09/2021",
    time: "12.48 pm",
    comment: "@Rahuld Hey Rahul We Need To Intergrate this as soon as possible",
  },
  {
    author: "Mayur Dere",
    date: "12/09/2021",
    time: "12.48 pm",
    comment:
      "@mayur dere Hey Rahul We Need To Intergrate this as soon as possible",
  },
  {
    author: "Abhisheck",
    date: "12/09/2021",
    time: "12.48 pm",
    comment: "@Rahuld Hey Rahul We Need To Intergrate this as soon as possible",
  },
  {
    author: "Mayur Dere",
    date: "12/09/2021",
    time: "12.48 pm",
    comment:
      "@mayur dere Hey Rahul We Need To Intergrate this as soon as possible",
  },
];
export default class Projectupdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_updates: "",
      write_update: false,
    };
  }

  async componentDidMount() {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    if (this.props.project_update_data.length === 0) {
      let api_data = {
        path: `/employee/createComment/NA/${this.context.state.project_overview_details.project_id}`,
        method: "GET",
        user_token: token,
      };
      let result = await Fetch_function(api_data);
      if (result.status) {
        if (result.data.msg === "successful") {
          this.props.set_project_update_data(
            result.data.data[0].commentDetails
          );
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
      searchdata = this.props.project_update_data.filter((items) => {
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
            add_new_comment={this.props.set_project_update_data}
            commentfor="Project"
            person={{
              name: this.context.state.user.name,
              profession: "Software Engineer",
            }}
          />
        </div>
        <br />
        <div className="header_container">
          <h5>Project Updates by Team</h5>
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
            ? this.props.project_update_data.map((items) => {
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

Projectupdates.contextType = AppContext;
