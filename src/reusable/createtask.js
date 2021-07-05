// import render from "htmlparser2/node_modules/dom-serializer";
// import React, { Component } from "react";
// import { v4 as uuidv4 } from "uuid";
// import AddTodo from "./TaskItems/AddTodo";
// import TodoItem from "./TaskItems/TodoItem";

// class CreateNewTask extends Component{
//   constructor(props){
//     super(props);
//     this.state={
//       Todos:{}
//     }
//   }


// render() {
//   return(
//     <div>
      
//        <AddTodo addTodo={this.addTodo} />
//        <div>
//          {todos.length > 0 ? (
//            <ul>
//              {this.state.Todos.map((todo) => (
//                <TodoItem
//                  key={todo.id}
//                  todo={todo}
//                  markComplete={this.markComplete}
//                  delTodo={this.delTodo}
//                />
//              ))}
//           </ul>
//         ) : (

//          <p>
//             You're all caught up!
//            </p>
//          )}
//        </div>
//      </div>
//   );
// }

// addTodo = (title) => {
//   let newTodo = {
//     id:uuidv4(),
//     title,
//     completed: false
//   };

//   this.setState({...this.state, Todos:newTodo})
// }
// }

// delTodo = (id) => {
//   this.setState({Todos:this.state.Todos.filter((todo) => todo.id !== id)});
// }
// // function CreateNewTask() {
// //   const [todos, setTodos] = useState([]);

// //   const addTodo = (title) => {
// //     let newTodo = {
// //       id: uuidv4(),
// //       title, 
// //       completed: false,
// //     };

// //     setTodos([...todos, newTodo]);
// //   };


// //   const delTodo = (id) => {
// //     setTodos(todos.filter((todo) => todo.id !== id));
// //   };

// //   const markComplete = (id) => {
// //     setTodos(
// //       todos.map((todo) =>
// //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
// //       )
// //     );
// //   };

// //   return (
// //     <div>
   

// //       <AddTodo addTodo={addTodo} />

// //       <div>
// //         {todos.length > 0 ? (
// //           <ul>
// //             {todos.map((todo) => (
// //               <TodoItem
// //                 key={todo.id}
// //                 todo={todo}
// //                 markComplete={markComplete}
// //                 delTodo={delTodo}
// //               />
// //             ))}
// //           </ul>
// //         ) : (

// //           <p>
// //             You're all caught up!
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// export default CreateNewTask;
