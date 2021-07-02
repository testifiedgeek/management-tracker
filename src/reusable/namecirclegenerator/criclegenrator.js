import "./circlegenerator.scss";

const GenarateName = ({ name }) => {
  let split_name = name.split(" ");
  let shorname = split_name[0].split("")[0] + split_name[1].split("")[0];
  let colors = ["#edfffa", "#e4fcfa", "#f8e4fc", "#fcebe4"];

  return (
    <div>
      <div
        className="user_profile"
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
      >
        {shorname.toUpperCase()}
      </div>
    </div>
  );
};

export default GenarateName;
