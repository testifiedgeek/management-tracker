import "./textdata.scss";
const RepresentData = ({ infodata }) => {
  return (
    <div className="info_container">
      <div>
        <h3>{infodata.title}</h3>
      </div>
      <div className="info_subdata">
        <div>
          <label>Start Date</label>
          <div>{infodata.startDate}</div>
        </div>
        <div>
          <label>End Date</label>
          <div>{infodata.endDate}</div>
        </div>
      </div>
    </div>
  );
};

export default RepresentData;
