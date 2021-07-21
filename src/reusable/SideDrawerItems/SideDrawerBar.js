import React, { Component } from "react";
import leftArrow from '../../assets/left.svg';
import rightArrow from '../../assets/right.svg';

class SideDrawerBar extends Component {
  render() {
    var sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
    return (
      <div className={sidebarClass}>
        <div>I have slided</div>
        
        <button onClick={this.props.toggleSidebar} className="sidebar-toggle">
          <img src={this.props.isOpen ? leftArrow : rightArrow} alt="arrow" />
        </button>
        
      </div>
    );
  }
}

export default SideDrawerBar;