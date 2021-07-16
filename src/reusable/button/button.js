import "./button.scss";

const Button = ({ title, fun, width }) => {
  return (
    <div className="button">
      <button style={{ width }} onClick={() => fun()}>
        {title}
      </button>
    </div>
  );
};

export default Button;
