import "./button.scss";

const Button = ({ title, fun, width, color, textcolor }) => {
  return (
    <div className="button">
      <button
        style={{ width, backgroundColor: color, color: textcolor }}
        onClick={() => (fun ? fun() : "")}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
