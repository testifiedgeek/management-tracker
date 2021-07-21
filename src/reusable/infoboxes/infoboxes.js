import "./infoboxes.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";

const Infoboxes = ({ info }) => {
  let box_content = info.map((items) => {
    return (
      <div className="box_container">
        <div>
          <label>{items.title}</label>
          <div className="box_info_container">
            <GenarateName name={items.name} />
            <h6>{items.name}</h6>
          </div>
        </div>
      </div>
    );
  });

  return <div className="boxes">{box_content}</div>;
};

export default Infoboxes;
