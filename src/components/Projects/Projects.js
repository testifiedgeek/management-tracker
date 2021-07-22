import React, { Component } from "react";
import "./Projects.scss";
import search from "../../assets/search.svg";
import { Card } from "../../reusable/cardcomponent/CardComponent";
import AppContext from "../../context/AppContext";
import Createproject from "../createproject/Createproject";
import Button from "../../reusable/button/button";
import navigate from "../../helperfunctions/navigation";
import TableCard from '../../reusable/TableCard/TableCard'

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_project: "",
      enable_create_section: false,
      content: [
        {
          srno: 1,
          title: "Policy maker",
          name: "Policy maker",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
          task_status: "complete",
        },
        {
          srno: 1,
          title: "Kompass",
          name: "Kompass ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "sampoorna Suraksha",
          name: "sampoorna Suraksha",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
        {
          srno: 1,
          title: "BPR Inovation",
          name: "BPR Inovation ",
          startDate: "12/02/2021",
          endDate: "20/02/2021",
        },
      ],
    };
  }

  // Create Project
  create_project = () => {
    this.setState({ enable_create_section: true });
    navigate(
      "push",
      "/projects",
      "Create Project",
      this.props.history,
      this.context
    );
  };

  render() {
    let searchdata;
    if (this.state.search_project !== "") {
      searchdata = this.state.content.filter((items) => {
        if (
          items.name
            .toLowerCase()
            .includes(this.state.search_project.toLowerCase())
        ) {
          return items;
        }
      });
    }

    return (
      <div>
        <div>
        {console.log(this.context)}
          {this.context.state.page !== "Create Project" ? (
            <div className="main_projects_web_container">
            
              <h3>All Projects types - all categories</h3>
              <div class="search_container">
                <div class="search_subcontainer">
                  <img src={search} />
                  <input
                    onChange={(e) =>
                      this.setState({ search_project: e.target.value })
                    }
                    type="text"
                    className="input_search"
                    placeholder="Type to search project"
                  />
                  <span>Sort By</span>
                </div>
              </div>
             
              <div className="create_project_btn">
                <Button title="Create Project" fun={this.create_project} />
              </div>
              <div className="table_container">
              <TableCard title="" 
                           content={[{pr_name:"Sampoorn Suraksha", team:"Innovation", status:"Completed", name:"Mayur Dere", st_date:"22/07/2021", tg_date:"27/07/2021"}, {pr_name:"Super Topup", team:"Innovation", status:"Incomplete", name:"Mayur Dere", st_date:"22/07/2021", tg_date:"27/07/2021"}, {pr_name:"PYP Journey", key2:"wow", status:"incompleted", team:"Innovation", name:"Mayur Dere", st_date:"22/07/2021", tg_date:"27/07/2021"}]} 
                           rows={["pr_name", "team","name", "st_date", "tg_date"]}
                           headings={["Project Name", "Team","Project Lead", "Start Date", "Target Date", ""]}
                           serial="true"
                           task="true"
                
                />
              </div>
              
            </div>
          ) : (
            <div className="project_createsection">
              <Createproject />
            </div>
          )}
          {/* Statistics Slide */}
        </div>

        {/* Mobile View of project screens */}
        <div className="main_projects_mobile_container">
          <div class="search_container">
            <div class="search_subcontainer">
              <img src={search} />
              <input
                onChange={(e) =>
                  this.setState({ search_project: e.target.value })
                }
                type="text"
                className="input_search"
                placeholder="Type to search project"
              />
            </div>
          </div>
        </div>

        {/* All Projects data in particular workplace */}
        <div className="card_data_mobileview">
          {this.state.content.length !== 0 ? (
            <Card
              title="Project Developement"
              navigation={{
                state: "push",
                path: "/project-overview",
                page: "Project Overview",
                history: this.props.history,
                context: this.context,
              }}
              content={
                this.state.search_project === ""
                  ? this.state.content
                  : searchdata
              }
            />
          ) : (
            <div>
              <p>Noting is there...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Projects.contextType = AppContext;
