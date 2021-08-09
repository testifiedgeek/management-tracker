import "./infoboxes.scss";
import {
  GenarateName,
  GenarateNameForId,
  GenarateNameForIdNotName,
} from "../namecirclegenerator/criclegenrator";

const Infoboxes = ({ info }) => {
  let box_content = info.map((items) => {
    let box_values;

    function box_values_fun() {
      if (typeof items.name === "object") {
        box_values = items.name.map((admin, index) => {
          if (index < 3) {
            if (index === 1) {
              return <GenarateNameForIdNotName id={admin.assigned_to} />;
            }
            return <GenarateNameForIdNotName id={admin.assigned_to} />;
          }
        });
        return box_values;
      } else {
        return (
          <div className="box_info_container">
            <GenarateName name={items.name} />
            <h6>{items.name}</h6>
          </div>
        );
      }
    }
    return (
      <div className="box_container">
        <div>
          <label>{items.title}</label>
          <div className="box_info_container">
            {items.title === "Task Status" ? items.name : box_values_fun()}
          </div>
        </div>
      </div>
    );
  });

  return <div className="boxes">{box_content}</div>;
};

export default Infoboxes;
