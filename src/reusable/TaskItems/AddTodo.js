// import React, {Component} from "react";

// class AddToDo extends Component{

//     constructor(props){
//       super(props);
      
//       this.state={titleValue:""}
//     }

//   render(){
//     return(
//       <div>
//       <form onSubmit={this.onSubmit}>
//          <input placeholder="Name" required ref={(input) => this._title = input}></input><br />
//          <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._description = textarea}></textarea>
//          <button type="submit">
//          +
//          </button>
//        </form>
//      </div>

//     );
//   }

//     onSubmit = (event) => {
//       event.preventDefault();
//       let title = this._title;
//       let description = this._description;
//       this.props.addTodo(title.value, description.value);
//     }

// }
// // import { useState } from "react";

// // function AddTodo(props) {
// //   const [title, setTitle] = useState("");

// //   const onSubmit = (e) => {
// //     e.preventDefault();

// //     if (!title) {
// //       alert("Please add a task description.");
// //       return;
// //     }

// //     props.addTodo(title);

// //     setTitle("");
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={onSubmit}>
// //         <input
// //           name="task-title"
// //           type="text"
// //           placeholder="Add task..."
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)} />
// //         <button type="submit">
// //         +
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// export default AddToDo;
