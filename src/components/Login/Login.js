import React, { Component } from "react";
import "../Login/Login.scss";
import officePana from "../../assets/Login.svg";
import MainApp from "../MainApp";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import Warning from "../../helperfunctions/warningfunction";
import navigate from "../../helperfunctions/navigation";
import AppContext from "../../context/AppContext";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeid: "",
      password: "",
    };
  }

  loginInput = (value) => {
    this.setState({ employeeid: value });
  };

  passwordInput = (value) => {
    this.setState({ password: value });
  };

  handleSubmit = async (e, context) => {
    let { employeeid, password } = this.state;
    e.preventDefault();
    let api_data = {
      path: "/login",
      method: "POST",
      body: {
        employeeId: employeeid,
        password,
      },
    };
    let result = await Fetch_function(api_data);
    if (result.msg === "Login Successfull") {
      console.log("result: ", result);
      window.localStorage.setItem("hdfcmanagementtracker", result.data.token);
      this.context.set_warning(
        true,
        "Succesfull",
        "Successfully Loged In",
        "green",
        this.context
      );
      let user = {
        name: "Dwarka ",
        email: "dwarka@gmail.com",
        profession: "AVP Head",
        employeeid: "142743",
      };
      this.context.set_user_details(user);
      setTimeout(() => {
        navigate(
          "push",
          "/dashboard",
          "Dashboard",
          this.props.history,
          this.context
        );
      }, 2000);
    } else if (result.msg === "Login failed") {
      this.context.set_warning(
        true,
        "failed",
        "Please Enter Write Credentials",
        "red",
        this.context
      );
    } else if (result.msg === "Something Went Wrong") {
      this.context.set_warning(
        true,
        "failed",
        "Something Went Wrong",
        "red",
        this.context
      );
    }
  };

  handleForgetPassword = () => {
    console.log("Forgot password");
  };

  render() {
    return (
      <div className="login_container">
        <img src={officePana} />
        <div className="login_info_container">
          <div className="welcome_container">
            <div className="welcome">Welcome!</div>
            <div className="welcome_subtitle">Sign in to continue</div>
          </div>

          <form className="login_form" onSubmit={(e) => this.handleSubmit(e)}>
            <span className="input_placeholder">Enter Work Email Id</span>
            <input
              name="employeeId"
              className="login_input"
              type="text"
              onChange={(e) => this.loginInput(e.target.value)}
            />
            <br />
            <br />
            <span className="input_placeholder">Enter Password</span>
            <input
              name="password"
              className="login_input"
              type="password"
              onChange={(e) => this.passwordInput(e.target.value)}
            />{" "}
            <br />
            <span
              className="forgot_password"
              onClick={() => this.handleForgetPassword()}
            >
              Forgot Password
            </span>{" "}
            <br /> <br />
            <button type="submit" className="blue_submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = AppContext;
