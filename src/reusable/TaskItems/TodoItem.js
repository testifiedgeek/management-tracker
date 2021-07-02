import React from 'react';



function TodoItem(props) {
  

  return (
    <li>
      <input
        name="completed-checkbox"
        type="checkbox"
        checked={props.todo.completed}
        value={props.todo.completed}
        onChange={() => props.markComplete(props.todo.id)}
        
      />
      <span>
        {props.todo.title}
      </span>
      <button
        onClick={() => props.delTodo(props.todo.id)}>
      </button>
    </li>
  );
}


export default TodoItem;
