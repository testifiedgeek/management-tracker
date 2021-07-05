import React, {Component} from 'react';
import '../Sidebar/SideBar.scss';
import AppContext from '../../context/AppContext';
import {withRouter} from 'react-router-dom';


class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    logoutClicked(context) {
        
        this.props.history.push('/')
    }

    dashboardClicked() {
        this.props.history.push('/dashboard')
    }

    projectsClicked() {
        this.props.history.push('/projects')
    }

    workspaceClicked() {
        this.props.history.push('/workspace')
    }

    settingClicked(){
        this.props.history.push('./settings')
    }

    render() {
        return(
            <div id="slide">
                <AppContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="Sidebar">

                            <div className="logo_container"><img className="logo" src={process.env.PUBLIC_URL + '/HDFC ERGO LOGO - RED.jpg'} alt="" /></div>
                            <div className="sidebar_items">

                            <div className="sidebar_top">
                                <div className="sidebar_buttons" onClick={() => this.dashboardClicked()}>Dashboard</div>
                                <div className="sidebar_buttons" onClick={() => this.projectsClicked()}>Projects</div>
                                <div className="sidebar_buttons" onClick={() => this.workspaceClicked()}>Workspace</div>
                            </div>
                            <div className="sidebar_bottom">
                                <div className="sidebar_buttons" onClick={() => this.logoutClicked(context)}>Logout</div>
                                <div className="sidebar_buttons" onClick={() => this.settingClicked()}>Settings</div>
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

Sidebar.contextType = AppContext;

export default withRouter(Sidebar);