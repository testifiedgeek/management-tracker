import '../projectdesc/projectdesc.scss';
import RepresentData from '../textinfo/textdata';
import Infoboxes from '../infoboxes/infoboxes';
import AppContext from '../../context/AppContext';
import { Component } from 'react';

class DescriptionCard extends Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
    return(
        <div className="info_represantation">
          <div className="represent_data">
            {this.context.state.project_overview_details ? (
                <div>
                    <span>{this.context.state.project_overview_details.project_name}</span>
                    <p>{this.context.state.project_overview_details
                    .project_description}</p>
                </div>
              
            ) : (
              <div></div>
            )}
          </div>
          <div className="represent_data2">
          <div className="item1">
          <Infoboxes 
              info={[
                {
                  title: "Project Lead",
                  name: this.state.admin ? this.state.admin : "Rahul",
                },
              ]}
            />
          </div>
          <div className="item2">
          <label>Status</label>
          <div>{this.context.state.project_overview_details.final_status ===
                    "0"
                      ? "In Progress"
                      : "Completed"}</div>
              
          </div>
          <div className="item3">
          <label>Start Date</label>
          <div>{this.context.state.project_overview_details.start_date.split("T")[0]}</div>
        </div>
        <div className="item4">
          <label>End Date</label>
          <div>{this.context.state.project_overview_details.completion_date.split("T")[0]}</div>
        </div>
          
          </div>
            
          </div>
    );

            }
}

DescriptionCard.contextType=AppContext;

export default DescriptionCard;