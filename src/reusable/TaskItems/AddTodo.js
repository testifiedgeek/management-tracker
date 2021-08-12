import React, { Component } from "react";
import "../../reusable/TaskItems/AddTodo.scss";
import PlusIcon from "../../assets/Plus.svg";

export default class AddTodo extends Component {
  state = {
    defaultValue: "",
    value: this.props.addTodoValue,
  };

  handleChange = (e) => {
    //Updating local component state
    this.setState({
      value: e.target.value,
    });
  };

  clearInput = () => {
    //Clear existing value in input
    document.getElementById("todoValue").value = "";

    //Updating local component state
    this.setState({ value: "" });
  };

  addTodo = () => {
    //Call method reference in Todos component using props
    this.props.toAddTodo(this.state.value);
    this.clearInput();
  };

  render() {
    return (
      <div className="create_task">
        <input
          type="text"
          id="todoValue"
          placeholder="New Task"
          onChange={this.handleChange}
        />
        <div className="input-group-append">
        <ion-icon name="add"></ion-icon>
        </div>
      </div>
    );
  }
}
