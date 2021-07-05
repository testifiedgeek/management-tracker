import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../../context/AppContext'
import '../Header/Header.scss';



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="slide">
                <AppContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="header">
                                <div className="header_left">
                                    <div className="header_buttons">B</div>
                                    <div className="header_buttons">{this.props.title}</div>
                                </div>
                                <div className="header_right">
                                    <div>User Profile</div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </AppContext.Consumer>
            </div>
        )
    }

}

Header.contextType = AppContext;

export default withRouter(Header);