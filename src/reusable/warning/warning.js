import "./warning.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const WarningPanel = ({ title, information, color }) => {
  return (
    // <div className="warning_container">
    //   <div style={{ backgroundColor: color }} className="warning_sub_container">
    //     <h6 style={{ color: "white", padding: 10 }}>{information}</h6>
    //   </div>
    // </div>
    <div className="warning_container">
      <Alert severity={color === "green" ? "success" : "error"}>
        {information}
      </Alert>
    </div>
  );
};

export default WarningPanel;
