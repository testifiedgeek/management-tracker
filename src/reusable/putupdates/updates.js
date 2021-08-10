import React, { useState, useContext } from "react";
import "./updates.scss";
import { GenarateName } from "../namecirclegenerator/criclegenrator";
import tagname from "../../helperfunctions/tagnames.js";
import AppContext from "../../context/AppContext";
import navigate from "../../helperfunctions/navigation";
import { Fetch_function } from "../../helperfunctions/fetchdata";

const tagData = {
  "@Anubhab Goel": "100019319843986",
  "@Dwarka Tiwari": "100020261664054",
  "@Yogendra Pednekar": "100054938640475",
  "@Rahuld": "100068986641675",
};

const Put_Updates = ({ commentfor, add_new_comment }) => {
  let [updates, setUpdates] = useState("");
  let [tag, setTag] = useState(false);
  let [psid, setPsid] = useState([]);

  const context = useContext(AppContext);
  const returnname = (name) => {
    let comment = updates + name + " ";
    setUpdates(comment);
    setTag(false);
    document.getElementsByClassName("updates_section")[0].focus();
  };

  const update_value = (updates) => {
    let { nativeEvent, target } = updates;
    if (nativeEvent.data) {
      if (nativeEvent.data.includes("@")) {
        setUpdates(target.value);
        setTag(true);
      } else {
        setUpdates(target.value);
        setTag(false);
      }
    } else {
      setUpdates(target.value);
      setTag(false);
    }
  };

  const putUpdate = async () => {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    context.set_creating_warning(
      true,
      "Succesfull",
      `Sending Your Update In ${context.state.project_overview_details.project_name}`,
      "dodgerblue",
      context
    );

    let bot_data = {
      sender: {
        id: "100068986641675",
      },
      payload_data: "Heloo iugwef wefiugweiufw fiuwgfuiwefwe",
    };
    let api_data2 = {
      path: "/employee/createComment",
      method: "POST",
      user_token: token,
      body: {
        // bot_data,
        content: updates,
        project_id: context.state.project_overview_details.project_id,
      },
    };

    Fetch_function(api_data2).then((result) => {
      if (result.status) {
        if (result.data.msg === "comment added successfully") {
          context.set_warning(
            true,
            "successfully",
            "Your Update Added Successfully",
            "green",
            context
          );
          console.log("uhuih", result.data.data[0].commentDetails);
          add_new_comment(result.data.data[0].commentDetails);
          setUpdates("");
          for (let items in tagData) {
            if (updates.includes(items)) {
              console.log("tagData[update_input[i]: ", tagData[items]);
              psid.push(tagData[items]);
            }
          }

          if (psid.length !== 0) {
            psid.forEach((items) => {
              fetch("https://stormy-ridge-52108.herokuapp.com/send_message", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  id: items,
                  message: updates,
                }),
              }).then((result) => {
                setUpdates("");
              });
            });
            // setPsid([])
          }
        }
      } else {
        context.set_warning(true, "failed", result.data, "red", context);
        setUpdates("");
      }
    });
  };

  const putTaskUpdate = async () => {
    let token = await window.localStorage.getItem("hdfcmanagementtracker");
    context.set_creating_warning(
      true,
      "Succesfull",
      `Sending Your Update In ${context.state.project_overview_details.project_name}`,
      "dodgerblue",
      context
    );

    let bot_data = {
      sender: {
        id: "100068986641675",
      },
      payload_data: "Heloo iugwef wefiugweiufw fiuwgfuiwefwe",
    };
    let api_data2 = {
      path: "/employee/createComment",
      method: "POST",
      user_token: token,
      body: {
        content: updates,
        project_id: context.state.task_overview_details.project_id,
        task_id: context.state.task_overview_details.task_id,
      },
    };

    Fetch_function(api_data2).then((result) => {
      if (result.status) {
        if (result.data.msg === "comment added successfully") {
          context.set_warning(
            true,
            "successfully",
            "Your Update Added Successfully",
            "green",
            context
          );
          add_new_comment(result.data.data[0].commentDetails);
          for (let items in tagData) {
            if (updates.includes(items)) {
              psid.push(tagData[items]);
            }
          }

          if (psid.length !== 0) {
            psid.forEach((items) => {
              fetch("https://stormy-ridge-52108.herokuapp.com/send_message", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  id: items,
                  message: updates,
                }),
              }).then((result) => {
                setUpdates("");
              });
            });
            // setPsid([])
          }
        }
      } else {
        context.set_warning(true, "failed", result.data, "red", context);
        setUpdates("");
      }
    });
  };

  return (
    <div className="updates_container">
      <div className="update_puter">
        <GenarateName name={context.state.user.name} />
        <div>
          <h5>{context.state.user.name}</h5>
          <label>{context.state.user.profession}</label>
        </div>
      </div>

      <div className="people_tag_container">
        <textarea
          value={updates}
          className="updates_section"
          onChange={(e) => update_value(e)}
          placeholder="Type Your Thoughts On this..."
        ></textarea>
        {tag === true ? (
          <div className="people_tag_subcontainer">{tagname(returnname)}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="update_btn">
        {updates !== "" ? (
          commentfor === "Project" ? (
            <button onClick={() => putUpdate()}>Send Update</button>
          ) : (
            <button onClick={() => putTaskUpdate()}>Send Update</button>
          )
        ) : (
          <button style={{ backgroundColor: "lightgrey" }}>Send Update</button>
        )}
      </div>
    </div>
  );
};

export default Put_Updates;
