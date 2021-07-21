import React, { Component } from "react";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import Infoboxes from "../../reusable/infoboxes/infoboxes";
import Put_Updates from "../../reusable/putupdates/updates";
import search from "../../assets/search.svg";
import "./projectupdates.scss";
import Commentcard from "../../reusable/commentcard/commentcard.js";

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
    };
  }
  render() {
    let searchdata;
    if (this.state.search_update !== "") {
      searchdata = testing.filter((items) => {
        if (
          items.author
            .toLowerCase()
            .includes(this.state.search_updates.toLowerCase()) ||
          items.comment
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
            person={{ name: "Rahul Darekar", profession: "Software Engineer" }}
          />
        </div>
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
            ? testing.map((items) => {
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
