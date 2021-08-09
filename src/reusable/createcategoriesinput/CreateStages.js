import "./CreateStages.scss";
const ReturnInput = ({ fun, perfun, delfun, title, index }) => {
  return (
    <div className="stages_input_fileds">
      <input
        className="name_input"
        placeholder={title}
        onChange={(e) => fun(e.target.value)}
      />
      <input
        className="percentage_input"
        placeholder="%"
        onChange={(e) => perfun(e.target.value)}
      />
      {index !== 0 ? (
        <ion-icon onClick={() => delfun(index)} name="close-outline"></ion-icon>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ReturnInput;
