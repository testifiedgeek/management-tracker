import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import './taskSidebar.scss';
import search from "../../assets/search.svg";


export default class TaskSidebar extends Component {
    constructor(props){
        super(props);
        this.state={
            divide:[],
        }
    }

    componentDidMount(){
        this.projectdividation();
        console.log(this.state.divide)
    }

    projectdividation = () => {
        // this.setState({ divide: [] });
        this.context.state.categories.forEach((items) => {
          this.state.divide.push({
            cat_id: items.category_id,
            cat_name: items.category_name,
            cat_work_status: { completed: 0, incomplete: 0 },
            cat_percentage: items.category_percentage,
            tasks: [],
          });
        });
    
        this.context.state.all_tasks.forEach((items2) => {
          this.state.divide.forEach((items) => {
            if (items.cat_id === items2.category_id) {
              items.tasks.push(items2);
              console.log(items.tasks);
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