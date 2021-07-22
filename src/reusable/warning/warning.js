import "./warning.scss";

const WarningPanel = ({ title, information, color }) => {
  console.log("title, information, color: ", title, information, color);
  return (
    <div className="warning_container">
      <div style={{ backgroundColor: color }} className="warning_sub_container">
        <h6 style={{ color: "white", padding: 10 }}>{information}</h6>
      </div>
    </div>
  );
};

export default WarningPanel;
