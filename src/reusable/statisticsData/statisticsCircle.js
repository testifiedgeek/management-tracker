import stats from "../../assets/stats.svg";
import "./statustics.scss";
const ShowStats = (props) => {
  let statsData = props.statsData;
  let statsTitle = statsData.map((items, index) => {
    return (
      <div key={index} className="stats_data">
        <div
          style={{
            backgroundColor: items.color,
            width: 5,
            height: 5,
            borderRadius: 100,
            padding: 3,
            marginRight: 8,
          }}
        ></div>
        <label>{items.title}</label>
        <label>{items.percentage}</label>
      </div>
    );
  });
  return (
    <div className="stats_container">
      <div className="stats_subcontainer">
        <div>
          <img alt="stats" src={stats} />
        </div>
        <div>{statsTitle}</div>
      </div>
    </div>
  );
};

export default ShowStats;
