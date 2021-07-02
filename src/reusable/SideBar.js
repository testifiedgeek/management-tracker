import React, {Component} from 'react';
import '../scss/SideBar.scss';
import AppContext from '../context/AppContext';
import {withRouter} from 'react-router-dom';
import { SidebarData } from './SidebarData';

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    logoutClicked(context) {
        context.updateisLogin(false)
        context.updateStart(false)
        localStorage.clear()
        this.props.history.push('/')
    }

    dashboardClicked() {
        this.props.history.push('/dashboard')
    }

    render() {
        return(
            <div id="slide">
                <AppContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="Sidebar">
                                

                                <img className="logo" src={process.env.PUBLIC_URL + '/HDFC ERGO LOGO - RED.jpg'} />  
                                
                                
                                <div className="List">

                                <div className="SidebarList">
                                    {SidebarData.map((val,key) => {
                                        return(
                                            <div>Gibberish</div>
                                        );
                                    }
                                    ) }
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

export default Sidebar;