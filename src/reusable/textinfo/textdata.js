import "./textdata.scss";
const RepresentData = ({ infodata }) => {
  return (
    <div className="info_container">
      <div>
        <h3>{infodata.title}</h3>
        <p className="project_desc">{infodata.desc}</p>
      </div>
      <div className="info_subdata">
        <div>
          <label>Start Date</label>
          <div>{infodata.startDate.split("T")[0]}</div>
        </div>
        <div>
          <label>End Date</label>
          <div>{infodata.endDate.split("T")[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default RepresentData;
