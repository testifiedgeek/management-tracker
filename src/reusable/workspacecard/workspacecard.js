import "./workspacecard.scss";
import innovation from "../../assets/innovation.svg";
import members_icon from "../../assets/members.svg";

const WorkspaceCard = ({ img, name, members }) => {
  return (
    <div className="workspace_card_container">
      <div className="workspace_card_subcontainer">
        <div className="upper_design"></div>
        <div className="card_icon">
          <img src={innovation} />
        </div>
        <div className="lower_info_design">
          <div className="workspace_name">{name}</div>
          <div className="workspace_data">
            <img src={members_icon} /> {members} members
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
