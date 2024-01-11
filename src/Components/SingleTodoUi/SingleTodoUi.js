import React from "react";
import "./SingleTodoUi.css";
import "../../Global.css";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { useState, useEffect } from "react";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

export default function SingleTodoUi() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(getLocalItems());
  const [editId, seteditId] = useState(0);

  //   localStorage.setItem("todo", JSON.stringify([...todos]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      let editedItem = todos.find((i) => {
        return i.id === editId;
      });
      let updatedTodo = todos.map((x) => {
        return x.id === editedItem.id
          ? (x = { id: x.id, todo })
          : (x = { id: x.id, todo: x.todo });
      });
      setTodos(updatedTodo);
      seteditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([...todos, { id: `${todo}-${Date.now()}`, todo }]);
      // console.log(todos);
      setTodo("");
    }
  };

  // handleSubmit()
  const handleDelete = (id) => {
    let deletedItem = todos.filter((x) => {
      return x.id !== id;
    });

    setTodos([...deletedItem]);
  };

  const handleEdit = (id) => {
    let editItem = todos.find((y) => {
      return y.id === id;
    });
    setTodo(editItem.todo);
    seteditId(editItem.id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container ">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="inputTxt"
            value={todo}
            placeholder="Add Items..."
            onChange={(e) => {
              setTodo(e.target.value);
              // console.log(todo);
            }}
          />
          <button type="submit"> {editId ? <FaEdit /> : <FaPlus />}</button>
        </form>

        <hr />
      </div>

      <div className="todo-list">
        <ul>
          {todos.map((y, index) => {
            return (
              <li key={y.id}>
                <span>{`${index + 1}. ${y.todo}`}</span>
                <FaEdit
                  className="editBtn btn"
                  onClick={() => {
                    handleEdit(y.id);
                  }}
                />
                <MdDeleteOutline
                  className="deleteBtn btn"
                  onClick={() => handleDelete(y.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}