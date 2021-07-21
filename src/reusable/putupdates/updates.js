import React, { useState, useContext } from "react";
import "./updates.scss";
import GenarateName from "../namecirclegenerator/criclegenrator";
import tagname from "../../helperfunctions/tagnames.js";
import AppContext from "../../context/AppContext";

const Put_Updates = () => {
  let [updates, setUpdates] = useState("");
  let [tag, setTag] = useState(false);

  const context = useContext(AppContext);
  const returnname = (name) => {
    let comment = updates + name + " ";
    setUpdates(comment);
    setTag(false);
    document.getElementsByClassName("updates_section")[0].focus();
  };

  const update_value = (updates) => {
    let { nativeEvent, target } = updates;
    console.log("updates: ", updates);
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
    </div>
  );
};

export default Put_Updates;
