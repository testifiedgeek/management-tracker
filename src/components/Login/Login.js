import React, {Component} from 'react';
import '../Login/Login.scss';
import officePana from '../../assets/Login.svg';
import MainApp from '../MainApp';
import AppContext from '../../context/AppContext';


  
export default class Login extends Component {
    handleSubmit = (e, context) => {
      e.preventDefault();
      console.log('Submitted!');
      this.context.updateLoginStatus(true);
    };

    handleForgetPassword = () => {
      console.log("Forgot password")
    }

    render() {
      return (
        <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
        <div className="office-pana">
          <img src={officePana}/>
        </div>
        <div className="login_container">
            <div className="welcome_container">
                <div className="welcome">Welcome!</div>
                <div className="welcome_subtitle">Sign in to continue</div>
            </div>
            
            <form className="login_form" onSubmit={(e) => this.handleSubmit(e)}>
                <span className="input_placeholder">Enter Work Email Id</span>
                <input name="employeeId" className="login_input" type="text" /*onChange={(e) => this.loginInput(e)}*/ />
                <br /><br />
                <span className="input_placeholder">Enter Password</span>
                <input name="password" className="login_input" type="password" /*onChange={(e) => this.loginInput(e)}*/ /> <br />
                <span className="forgot_password" onClick={() => this.handleForgetPassword()}>Forgot Password</span> <br /> <br />
                <button type="submit" className="blue_submit">Continue</button>
            </form>
        </div>
        
    </div>
        
      )
    }
  }
  
  Login.contextType=AppContext;
