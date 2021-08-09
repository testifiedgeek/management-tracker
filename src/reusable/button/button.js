import "./button.scss";

const Button = ({ title, fun, width, color }) => {
  return (
    <div className="button">
      <button
        style={{ width, backgroundColor: color }}
        onClick={() => (fun ? fun() : "")}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
