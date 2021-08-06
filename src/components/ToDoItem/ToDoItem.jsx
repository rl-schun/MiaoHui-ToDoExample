import React, { useState } from "react";
import "./ToDoItem-Style.css";

import { toggleTodoItem } from "../../service/firestore";

function ToDoItem({ itemName, isDone, id }) {
  const [done, setDone] = useState(isDone);

  const getCheckboxClass = () => {
    return done ? "checkbox-done" : "checkbox-notdone";
  };

  const getSpanClass = () => {
    return done ? "item-name-done" : "item-name-notdone";
  };

  const handleOnClick = () => {
    setDone((original) => !original);
    toggleTodoItem(id);
  };

  return (
    <div className="item-wrapper" onClick={handleOnClick}>
      <div className={getCheckboxClass()}></div>
      <span className={getSpanClass()}>{itemName}</span>
    </div>
  );
}

export default ToDoItem;
