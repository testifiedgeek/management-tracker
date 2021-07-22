import React, { Component } from 'react';
import AddTodo from './TaskItems/AddTodo';
import TodoItem from './TaskItems/TodoItem';
import '../scss/createtask.scss';


export default class TodoList extends Component {

    constructor(props){
        super(props);
        this.state={

            addTodoValue: "",
        todos: [
            {
                id: 1,
                value: "todo 1",
                isDone: false,
                details: "wow this is done"
            },
            {
                id: 2,
                value: "todo 2",
                isDone: true,
                details: ""
            },
            {
                id: 3,
                value: "todo 3",
                isDone: false,
                details: "amazing job"
            }
        ]
        }
    }

     
     getTime() {
        let d = new Date();
        var n = d.getTime();
        return n;
    }

   
    handleDelete = todo => {
        const todos = this.state.todos.filter((t) => {
            return t.id !== todo
        });
        this.setState({ todos });
    }

    handleDone = todo => {
        const todos = [...this.state.todos];
        todos.map((t) => {
            if (t.id === todo.id) {
                t.isDone = !t.isDone;
            }
            return t;
        });
        this.setState({todos});
    }


    addNewTodo = (value) => {
        if (value) {
            const todos = [...this.state.todos];
            todos.push(
                {
                    id: this.getTime(),
                    value: value,
                    isDone: false,
                    details:""
                }
            );
            this.setState({ addTodoValue: "", todos })
        } else {
            console.log("Please Add Todo Text");
        }
    }

    setUpdate = (updateTitle, id) => {
        console.log(id);
        this.setState({
            todos: this.state.todos.map(todo => {
              if (todo.id === id) {
                todo.value = updateTitle
              }
              return todo
            }),
          })
    }

    setUpdateDetail = (updateDetail, id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id == id) {
                    todo.details = updateDetail
                }
                return todo
            }),
        });
    }

    render() {
        return (
            <div>
                <table className="task_table">
                <tbody>

                    <tr>
                        <td colSpan="4">
                            <AddTodo toAddTodo={this.addNewTodo} addTodoValue={this.state.addTodoValue} />
                        </td>
                    </tr>
                    
                    {this.state.todos.map((todo, index) => (
                        <tr className="task_items" key={todo.id}>
                            <TodoItem index={index+1} todo={todo} fooDelete={this.handleDelete} fooDoneDone={this.handleDone} setUpdate={this.setUpdate} setUpdateDetail={this.setUpdateDetail}/>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
            </div>
        )
    }
}
