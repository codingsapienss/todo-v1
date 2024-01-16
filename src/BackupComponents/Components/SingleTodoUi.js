import React, { useRef } from "react";
import "./Style.css";
import "../Global.css";
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

  const inputRef = useRef();

  //   localStorage.setItem("todo", JSON.stringify([...todos]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      let editedItem = todos.find((i) => {
        return i.id === editId;
      });

      if (!editedItem) {
        seteditId(0);
        setTodos([
          ...todos,
          { id: `${todo}-${Date.now()}`, todo, checked: false },
        ]);
        setTodo("");
      }
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
      setTodos([
        ...todos,
        { id: `${todo}-${Date.now()}`, todo, checked: false },
      ]);
     
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

  const handleCheck = (id) => {
    let checkedItem = todos.find((todo) => todo.id === id);
    let updatedTodo = todos.map((todo) => {
      return todo.id === checkedItem.id
        ? (todo = { ...todo, checked: !todo.checked })
        : (todo = { ...todo });
    });

    setTodos(updatedTodo);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            required
            autoComplete="off"
            type="text"
            ref={inputRef}
            name="inputTxt"
            value={todo}
            placeholder="Add Items..."
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button
            onClick={() => {
              inputRef.current.focus();
            }}
            aria-label="Add"
            type="submit"
          >
            {" "}
            {editId ? <FaEdit /> : <FaPlus />}
          </button>
        </form>

        <hr />
      </div>

      <div className="todo-list">
        <ul>
          {todos.map((y, index) => {
            return (
              <li className={y.checked ? "checked" : ""} key={y.id}>
                <input
                  checked={y.checked}
                  onChange={() => {
                    handleCheck(y.id);
                  }}
                  id="checkbox"
                  type="checkbox"
                />

                <span>{`${index + 1}. ${y.todo}`}</span>
                <FaEdit
                  className="editBtn btn"
                  onClick={() => {
                    handleEdit(y.id);
                    inputRef.current.focus();
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
