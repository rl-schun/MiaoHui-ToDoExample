import React, { useState } from "react";
import "./ToDoGroup-Style.css";

import ToDoItem from "../ToDoItem/ToDoItem";
import { addTodoItem } from "../../service/firestore";

function ToDoGroup({ title, toDoItems, id }) {
  const [addTodo, setAddTodo] = useState(false);
  const [todoName, setTodoName] = useState("");

  const handlePressAdd = () => {
    setAddTodo((original) => !original);
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter" && todoName !== "") {
      // AddTodo
      addTodoItem(id, todoName);
      setTodoName("");
      setAddTodo(false);
    }
  };

  const inputElement = (
    <input
      className="todo-input"
      type="text"
      onKeyDown={handleInputEnter}
      onChange={(e) => {
        setTodoName(e.target.value);
      }}
    />
  );

  return (
    <div className="wrapper">
      <h3 className="toDoGroup-title">
        {title}
        <span className="add-button" onClick={handlePressAdd}>
          +
        </span>
      </h3>
      <ol>
        {toDoItems.map((item) => {
          return (
            <ToDoItem
              key={item.id}
              id={`${id}_${item.id}`}
              itemName={item.name}
              isDone={item.done}
            />
          );
        })}
      </ol>
      {addTodo && inputElement}
    </div>
  );
}

export default ToDoGroup;
