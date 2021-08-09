import './projectsCard.scss'
import BPRIcon from '../../assets/BPR Icon.svg'
import { GenarateName } from "../namecirclegenerator/criclegenrator";


const ProjectCard = ({ content }) => {
    return (
      <div className="projects_card_container">
        <div className="projects_card_subcontainer">
          <div className="card_top">
          <div className="card_top_item">
            <img src={BPRIcon} />
          </div>
          <div className="card_top_item">
            {content.work_place_id}
          </div>
          </div>
          <div className="card_bottom">
            <div className="bottom_top">
                <div>{content.project_name}</div>
                <div className="status">{content.status}</div>
            </div>
            <div className="bottom_middle">
            <div>
                <label>Start Date</label>
                <div>{content.start_date}</div>
            </div>
            <div>
                <label>Target Date</label>
                <div>{content.end_date}</div>
            </div>
            </div>
            <div className="bottom_bottom">
            <div>
            <label>Project Lead</label>
                <div className="info_box">
                    <div><GenarateName name={content.project_lead}/></div>
                    <div>{content.project_lead}</div>
                </div>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;