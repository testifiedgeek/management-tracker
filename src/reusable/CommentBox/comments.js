import React, { Component } from 'react';
import CommentForm from '../CommentItems/CommentForm';
import Comment from '../CommentItems/ShowComment';
import '../CommentBox/comments.scss';

class CommentBox extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showComments: false,
        comments: [
          {id: 1, author: "random1", body: "FF"},
          {id: 2, author: "random2", body: "wnrejlvbgsljgvblkrenglsa"},
          {id: 3, author: "random3", body: "slk;ebni;knbwa;phinpegjn;slkhjn;sjhn"}
        ]
      };
    }
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <CommentForm addComment={this._addComment}/>
          <button id="comment-reveal" onClick={this._handleClick}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    } 
    
    _addComment = (author, body) => {
      const comment = {
        id: this.state.comments.length + 1,
        author,
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); 
    }
    
    _handleClick = () => {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments = () => {    
      return this.state.comments.map((comment) => { 
        return (
          <Comment 
            author={comment.author} 
            body={comment.body} 
            key={comment.id} 
            />
        ); 
      });
    }
    
    _getCommentsTitle = (commentCount) => {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } 
  
  // _deleteComment = (id) => {
  //   this.setState({comments: this.state.comments.filter((comment) => comment.id !== id)});
  // };

  
   
  
   export default CommentBox;
  
  
