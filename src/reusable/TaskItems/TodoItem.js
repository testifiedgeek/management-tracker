import React, { Component } from "react";
import Popup from "../Popup/Popup";
import "../TaskItems/Todoitems.scss";

export default class TodoItem extends Component {
  state = {
    editing: false,
    seen: false,
  };

  handleEditing = () => {
    console.log("edit mode active");
    this.setState({ editing: true, seen: !this.state.seen });
  };

  handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      this.setState({ editing: false });
    }
  };

  render() {
    let viewMode = {};
    let editMode = {};

    if (this.state.editing) {
      viewMode.display = "none";
    } else {
      editMode.display = "none";
    }

    return (
      <React.Fragment>
        <td style={{ width: 15 }} className="text-center">
          <input
            type="checkbox"
            defaultChecked={this.props.todo.isDone}
            onChange={() => this.props.fooDoneDone(this.props.todo)}
          />
        </td>
        <td className="view_input">
          <tr>
            <td>{this.renderTodo()}</td>
          </tr>
          <tr>
            <td className="detail_input">{this.props.todo.details}</td>
          </tr>
        </td>

        {/* <td className="text-center">
                    <button onClick={() => this.props.fooDelete(this.props.todo.id)}>Delete</button>
                </td> */}
        <td>
          <button onClick={this.handleEditing}>:</button>
        </td>
        <div>
          {this.state.seen ? <Popup 
            content={(
            <div className="modal" style={editMode}>
              
              <br />

              <label htmlFor="title">Task Title</label>

              <br />
              <input
                id="title"
                type="text"
                value={this.props.todo.value}
                onChange={(e) => {
                  this.props.setUpdate(e.target.value, this.props.todo.id);
                }}
                onKeyDown={this.handleUpdatedDone}
              />

              <label htmlFor="details">Add Details</label>
              <br />
              <input
                type="textarea"
                id="details"
                value={this.props.todo.details}
                onChange={(e) => {
                  this.props.setUpdateDetail(
                    e.target.value,
                    this.props.todo.id
                  );
                }}
                onKeyDown={this.handleUpdatedDone}
              />
            </div>
          )}
          handleClose={this.handleEditing}
          /> : null}
        </div>
      </React.Fragment>
    );
  }

  renderTodo() {
    if (this.props.todo.isDone) return <s>{this.props.todo.value}</s>;
    else return this.props.todo.value;
  }
}
