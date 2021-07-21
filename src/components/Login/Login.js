import React, {Component} from 'react';
import '../Login/Login.scss';

  
export default class Login extends Component {
    handleSubmit = (e, context) => {
      e.preventDefault();
      console.log('Submitted!');
    };
    render() {
      return (
        <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
        <div className="login_container">
            <div className="welcome_container">
                <div className="welcome">Welcome Back</div>
                <div className="welcome_subtitle">To log in please enter your Username and Password</div>
            </div>
            
            <form className="login_form" onSubmit={(e) => this.handleSubmit(e)}>
                <span className="input_placeholder">Username</span>
                <input name="employeeId" className="login_input" type="text" /*onChange={(e) => this.loginInput(e)}*/ />
                <br /><br />
                <span className="input_placeholder">Password</span>
                <input name="password" className="login_input" type="password" /*onChange={(e) => this.loginInput(e)}*/ /> <br /><br />
                <a href="/login/forgotpassword">Forgot Password ?</a> <br /> <br />
                <button type="submit" className="blue_submit">Login</button>
            </form>
        </div>
        
    </div>
        
      )
    }
  }
  
  
