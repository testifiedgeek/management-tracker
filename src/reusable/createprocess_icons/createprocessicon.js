import "./createprocess.scss";
import navigate from "../../helperfunctions/navigation";

const Createprocess_icon = (title, navigation) => {
  let { state, path, page, history, context } = navigation;
  return (
    <div className="createprocess_icon_container">
      <div
        onClick={() => navigate(state, path, page, history, context)}
        className="createprocess_icon_subcontainer"
      >
        <label>{title}</label>
      </div>
    </div>
  );
};

export default Createprocess_icon;
