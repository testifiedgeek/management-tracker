import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import CommentBox from '../../reusable/CommentBox/comments';
import '../Projects/Projects.scss';

class Projects extends Component {
    render() {
        return (
            <div className="page_container">
                <CommentBox />
            </div>
        )
    }
}

export default withRouter(Projects);