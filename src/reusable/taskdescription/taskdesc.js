import React, { Component } from 'react';
import TodoList from '../createSubtask';
import './taskdesc.scss';
import Infoboxes from '../infoboxes/infoboxes';
import AppContext from '../../context/AppContext';

export default class TaskDesc extends Component {

    constructor(props){
        super(props);
        this.state={}
    }

    calculatestatus = () => {
        if (
          this.context.state.task_overview_details.assigned_to ===
          parseInt(this.context.state.user.employeeid)
        ) {
          if (this.context.state.task_overview_details.final_status === 0) {
            return "Accept";
          } else if (this.context.state.task_overview_details.final_status === 1) {
            return "Click to Complete";
          } else if (this.context.state.task_overview_details.final_status === 2) {
            return "Completed";
          }
        } else {
          if (this.context.state.task_overview_details.final_status === 0) {
            return "Not Accept Yet";
          } else if (this.context.state.task_overview_details.final_status === 1) {
            return "Task In Progress";
          } else if (this.context.state.task_overview_details.final_status === 2) {
            return "Task Completed";
          }
        }
      };

    render() {
        let assined_to = this.context.state.members.filter((items) => {
            if (
              this.context.state.task_overview_details.assigned_to === items.emp_id
            ) {
              return items.first_name + " " + items.last_name;
            }
          });
        return (
            <div className="task_grid_system">
                <div className="task_title">{this.props.infodata.title}</div>
                <div className="task_description">
                    <label>Description</label>
                    <div>{this.props.infodata.desc}</div>
                </div>
                <div className="sub_task">
                    <TodoList />
                </div>
                <div className="task_info">
                
          <div className="item1">
          <Infoboxes 
              info={[
                
                {
                  title: "Assinged To",
                  name:
                    assined_to[0].first_name + " " + assined_to[0].last_name
                      ? assined_to[0].last_name
                      : assined_to[0].first_name,
                },
              ]}
            />
          </div>
          <div className="item2">
          <label>Status</label>
          <div>{this.calculatestatus()}</div>
              
          </div>
          <div className="item3">
          <label>Start Date</label>
          <div>{this.props.infodata.startDate.split("T")[0]}</div>
        </div>
        <div className="item4">
          <label>End Date</label>
          <div>{this.props.infodata.endDate.split("T")[0]}</div>
        </div>
          
          </div>
                
            </div>
        )
    }
}

TaskDesc.contextType= AppContext;
