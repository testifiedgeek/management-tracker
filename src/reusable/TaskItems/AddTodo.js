import { useState } from "react";

function AddTodo(props) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a task description.");
      return;
    }

    props.addTodo(title);

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">
        +
        </button>
      </form>
    </div>
  );
}


export default AddTodo;
