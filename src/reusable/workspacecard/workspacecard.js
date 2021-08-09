import "./workspacecard.scss";

const WorkspaceCard = ({ img, name, members }) => {
  return (
    <div className="workspace_card_container">
      <div className="workspace_card_subcontainer">
        <div className="upper_design"></div>
        <div className="bottom_part_card">
          <div className="card_icon"></div>
          <div className="lower_info_design">
            <h3>{name}</h3>
            <span>{members} members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
