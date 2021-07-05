import React, { Component } from 'react';
import TableContent from '../../reusable/table';
import './dashboard.scss'

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard_container">
            
                <TableContent title="Project Developement" content={[{key1:"wow", key2:"wow"}, {key1:"wow", key2:"wow"}, {key1:"wow", key2:"wow"}]}/>
            </div>
        )
    }
}
