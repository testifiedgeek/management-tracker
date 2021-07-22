import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import ShowStats from "../../reusable/statisticsData/statisticsCircle";
import "./dashboard.scss";
import { Card } from "../../reusable/cardcomponent/CardComponent";
import TodoList from "../../reusable/createSubtask";
import { Fetch_function } from "../../helperfunctions/fetchdata";
import navigate from "../../helperfunctions/navigation";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // Fetch Tasks assign to loged in user

    let api_data = {
      path: "/tasks",
      method: "POST",
      body: {
        // employeeId:employeeid,
        // password
      },
    };
    let result = await Fetch_function(api_data);
    if (result) {
      if (result.msg === "Login Successfull") {
        console.log("result: ", result);
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
        navigate(
          "push",
          "/dashboard",
          "Dashboard",
          this.props.history,
          this.context
        );
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
    } else {
      this.context.set_warning(
        true,
        "failed",
        "Something Went Wrong",
        "red",
        this.context
      );
    }
  }

  render() {
    return (
      <div className="dashboard_container">
        <div className="stats_data_main_container">
          <ShowStats
            navigation={{
              state: "push",
              path: "/projects",
              page: "Projects",
              history: this.props.history,
              context: this.context,
            }}
            title="Total Projects"
            component="Dashboard"
            statsData={[
              { color: "green", title: "Testing just", percentage: "70%" },
              { color: "red", title: "Completed", percentage: "70%" },
              { color: "red", title: "Completed", percentage: "70%" },
            ]}
          />
        </div>
        <h4>Tasks Assign to me</h4>
        <div className="table_data_webview">
          <TodoList />
        </div>

        <div className="card_data_mobileview">
          <Card
            title="Project Developement"
            navigation={{
              state: "push",
              path: "/project-overview",
              page: "Project Overview",
              history: this.props.history,
              context: this.context,
            }}
            content={[
              {
                srno: 1,
                title: "wow ",
                name: "Design Profile",
                startDate: "12/02/2021",
                endDate: "20/02/2021",
                task_status: "complete",
              },
              {
                srno: 1,
                title: "wow",
                name: "Develop login",
                startDate: "12/02/2021",
                endDate: "20/02/2021",
              },
              {
                srno: 1,
                title: "wow",
                name: "Major React combinations",
                startDate: "12/02/2021",
                endDate: "20/02/2021",
              },
              {
                srno: 1,
                title: "wow",
                name: "implemente testings",
                startDate: "12/02/2021",
                endDate: "20/02/2021",
              },
              {
                srno: 1,
                title: "wow",
                name: "Ensure functionality",
                startDate: "12/02/2021",
                endDate: "20/02/2021",
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

Dashboard.contextType = AppContext;
