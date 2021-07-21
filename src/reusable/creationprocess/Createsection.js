import React, { useState } from "react";
import "./createsection.scss";

const Createsection = ({
  type,
  input_handle_fun,
  label,
  searchtitle,
  data,
  display,
  display_fun,
  selected_fun,
  selected,
}) => {
  console.log("selected: ", selected);

  const [query, setQuery] = useState("");
  const [addcategory, setaddcategory] = useState(false);
  const [newcategory, setNewcategory] = useState("");

  const add_new_category = (category) => {
    selected_fun("new", null, category);
    setNewcategory("");
    setaddcategory(false);
  };

  return (
    <div className="section_container">
      <div className="web_view_sectiondisplay">
        {type === "input" ? (
          // for input sections
          <input
            maxLength="30"
            type="text"
            placeholder={label}
            onChange={(e) => input_handle_fun(e.target.value)}
          />
        ) : (
          // for drop down sections
          <div className="depatments_display">
            <div
              onClick={() =>
                display === false ? display_fun(true) : display_fun(false)
              }
              className="department_selection"
            >
              <label>
                {selected.length === 0 ? label : `${selected.length} Selected`}
              </label>
              {display ? (
                <ion-icon name="caret-up"></ion-icon>
              ) : (
                <ion-icon name="caret-down"></ion-icon>
              )}
            </div>
            {display ? (
              <div className="drop_down_departments">
                {label === "Select Categories" ? (
                  <div>
                    {addcategory ? (
                      <div className="search_container">
                        <input
                          value={newcategory}
                          onChange={(e) => setNewcategory(e.target.value)}
                          placeholder="Type Category name here"
                        />
                        {newcategory === "" ? (
                          <h6
                            onClick={() => setaddcategory(false)}
                            style={{ color: "red" }}
                          >
                            cancel
                          </h6>
                        ) : (
                          <h6
                            onClick={() => add_new_category(newcategory)}
                            style={{ color: "#2541b2" }}
                          >
                            Add
                          </h6>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => setaddcategory(true)}
                        className="search_container"
                      >
                        <ion-icon
                          style={{ color: "#2541b2" }}
                          name="add-outline"
                        ></ion-icon>
                        <h5 style={{ color: "#2541b2" }}>
                          Add Custom Category
                        </h5>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="search_container">
                    <ion-icon name="search-outline"></ion-icon>
                    <input
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={searchtitle}
                    />
                  </div>
                )}
                {query === ""
                  ? data.map((items, index) => {
                      return (
                        <div>
                          {selected.data[index] ? (
                            <div
                              onClick={() => selected_fun("remove", index)}
                              className="selected_or_not"
                            >
                              <p>{items}</p>

                              <ion-icon
                                style={{ color: "green", fontSize: 25 }}
                                name="checkmark-done-circle"
                              ></ion-icon>
                            </div>
                          ) : (
                            <div
                              onClick={() => selected_fun("add", index, items)}
                              className="selected_or_not"
                            >
                              <p>{items}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  : data.filter((items, index) => {
                      if (
                        items
                          .toLocaleLowerCase()
                          .includes(query.toLocaleLowerCase())
                      ) {
                        return (
                          <div>
                            {selected.data[index] ? (
                              <div
                                onClick={() => selected_fun("remove", index)}
                                className="selected_or_not"
                              >
                                <p>{items}</p>
                                <ion-icon
                                  style={{ color: "green", fontSize: 25 }}
                                  name="checkmark-done-circle"
                                ></ion-icon>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  selected_fun("add", index, items)
                                }
                                className="selected_or_not"
                              >
                                <p>{items}</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
              </div>
            ) : (
              <div></div>
            )}

            {display ? (
              <div className="department_selection">
                {selected.length > 0 ? (
                  <label
                    onClick={() => display_fun(false)}
                    style={{ float: "right", color: "blue", cursor: "pointer" }}
                  >
                    Done
                  </label>
                ) : (
                  <label
                    style={{ float: "right", color: "grey", cursor: "pointer" }}
                  >
                    Done
                  </label>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Createsection };
