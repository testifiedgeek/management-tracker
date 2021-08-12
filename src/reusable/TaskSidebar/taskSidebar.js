import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import './taskSidebar.scss';
import search from "../../assets/search.svg";
import { Fetch_function } from '../../helperfunctions/fetchdata';


export default class TaskSidebar extends Component {
    constructor(props){
        super(props);
        this.state={
            divide:[],
            project_plane_data_cats:[],
            project_plan_data:[],
        }
    }

    async componentDidMount() {
      let token = await window.localStorage.getItem("hdfcmanagementtracker");
  
      if (this.state.project_plane_data_cats.length === 0) {
        let all_project_data = {
          path: `/employee/createProject/${this.context.state.task_overview_details.project_id}`,
          method: "GET",
          user_token: token,
        };
        let result = await Fetch_function(all_project_data);
        console.log(result);
        if (result.status) {
          if (result.data.msg === "successful") {
            this.setState({project_plane_data_cats: result.data.data[0].categoriesDetails});
              
          //   this.props.set_project_plane_data_admin(
          //     result.data.data[0].projectAdminDetails
          //   );
          //   this.props.set_project_plane_data_team(
          //     result.data.data[0].projectTeamDetails
          //   );
          //   this.setState({ admin: result.data.data[0].projectAdminDetails });
          // }
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
  
      if (this.state.project_plan_data.length === 0) {
        let api_data = {
          path: `/employee/createTask/NA/${this.context.state.task_overview_details.project_id}`,
          method: "GET",
          user_token: token,
        };
        let result2 = await Fetch_function(api_data);
        console.log("result2: ", result2);
        if (result2.status) {
          if (result2.data.msg === "successful") {
            this.setState({project_plan_data: result2.data.data});
          }
        } else {
          this.context.set_warning(
            true,
            "failed",
            result2.data,
            "red",
            this.context
          );
        }
      }
  
      this.projectdividation();
      this.setState({ update: true });
    }
  }
  
    projectdividation = () => {
      this.setState({ divide: [] });
      this.state.project_plane_data_cats.forEach((items) => {
        this.state.divide.push({
          cat_id: items.category_id,
          cat_name: items.category_name,
          cat_work_status: { completed: 0, incomplete: 0 },
          cat_percentage: items.category_percentage,
          tasks: [],
        });
      });
  
      this.state.project_plan_data.forEach((items2) => {
        this.state.divide.forEach((items) => {
          if (items.cat_id === items2.category_id) {
            items.tasks.push(items2);
          }
        });
      });
    };

      

    render() {
        return (
                 <div className="side_container">
                 
                 <div class="search_container">
            <div class="search_subcontainer">
              <img src={search} />
              <input
                type="text"
                className="input_search"
                placeholder="Sort by Task name, Stage name, etc"
              />
            </div>
          </div>
                 
                    {this.state.divide.map((items, key) => {
                        return(
                            <div>
                                <div key={key} className="side_top">
                                    <div className="side_title">
                                    {items.cat_name}
                                    </div>
                                    <div className="side_add">
                                    <ion-icon name="add"></ion-icon>
                                    </div>
                                </div>
                                <div className="side_content">
                                    <div>
                                    {items.tasks.map((task, key) => {
                                     return(
                                    <tr>
                                    <td>
                                    <div className="side_task_items">
                                    <div className="side_task_item1">
                                    <ion-icon name="checkmark-circle"></ion-icon>
                                    </div>
                                     <div key={key} className="side_task_item2">
                                        {task.task_name}
                                     </div>
                                    </div>
                                    
                                    </td>
                                    </tr>

                                    );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )    
                    })}
                </div> 
        )
        
    }
}


TaskSidebar.contextType=AppContext;