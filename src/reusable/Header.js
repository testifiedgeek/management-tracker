import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AppContext from '../context/AppContext'
// import team_meeting from '../svg/team_meeting.svg'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    // logoutClicked(context) {
    //     context.updateisLogin(false)
    //     context.updateStart(false)
    //     localStorage.clear()
    //     this.props.history.push('/')
    // }

    // addUserClicked(context) {
    //     context.updateUserForm('add')
    //     this.props.history.push('/admin/create-user')
    // }


    // breakClicked(context) {
    //     this.setState({start: false},
    //         () => {
    //             context.breakClicked(1)
    //             context.updateStart(this.state.start)
    //             this.props.history.push('/resume')   
    //         })
    // }

    // dashboardClicked() {
    //     this.props.history.push('/admin')
    // }

    // roleChangeAgent(context) {
    //     var roles = { ...this.state.roles }
    //     roles.agent = true;
    //     this.setState({ roles }, () => {
    //         context.updateRoles(this.state.roles)
    //     })
    // }

    render() {
        return (
            <div id="slide">
                <AppContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div>
                                <div className="header">
                                    
                                    <div className="header_right">
                                        {<div className="logout">Dashboard</div>}

                                        {<div className="logout">Add User</div>}

                                        {<div className="logout">Log out</div>}
                                        
                                        
                                    </div>
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

export default Header;