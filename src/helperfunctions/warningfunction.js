import AppContext from "../context/AppContext";

const Warning = (status, title, information, color, context) => {
  console.log(
    "status, title, information, color, context: ",
    status,
    title,
    information,
    color,
    context
  );
  context.state.warning = {
    title,
    information,
    color,
    status,
  };
  console.log(context);
};

export default Warning;
