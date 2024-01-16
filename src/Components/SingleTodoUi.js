import React, { useRef } from "react";
import "./Style.css";
import "../Global.css";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleTodoUi() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("Lists")) || []
  );
  const [editId, seteditId] = useState(0);

  const inputRef = useRef();
  const { id } = useParams();

  console.log("id", id); //   localStorage.setItem("todo", JSON.stringify([...todos]));

  const selectedList = todos?.find((t) => {
    return t.id == id;
  });
  console.log("selectedList", selectedList);
  console.log("todos", todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      let editedItem = selectedList.list.find((i) => {
        return i.id == editId;
      });

      console.log(editedItem);

      if (!editedItem) {
        console.log("clicked when deleted");
        let updatedTodo = todos.map((t) => {
          console.log(t.id == id);
          // console.log(t);
          return t.id == id
            ? (t = {
                ...t,
                list: [
                  ...t.list,
                  { id: Date.now(), todo: todo, checked: false },
                ],
              })
            : (t = { ...t });
        });

        console.log(updatedTodo);

        setTodos(updatedTodo);
        setTodo("");
        seteditId(0);

        console.log("clicked when deleted2222");
        return;
      }

      let updatedTodo = todos?.map((t) => {
        return t.id == id
          ? (t = {
              ...t,
              list: selectedList.list.map((t) => {
                return t.id == editId
                  ? (t = { ...t, todo: todo })
                  : (t = { ...t });
              }),
            })
          : (t = { ...t });
      });
      setTodos(updatedTodo);
      seteditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      let updatedTodo = todos?.map((t) => {
        return t.id == id
          ? (t = {
              ...t,
              list: [...t.list, { id: Date.now(), todo: todo, checked: false }],
            })
          : (t = { ...t });
      });

      // setTodos([
      //   ...todos,
      //   { id: `${todo}-${Date.now()}`, todo, checked: false },
      // ]);

      setTodos(updatedTodo);

      setTodo("");
    }
  };

  // handleSubmit()
  const handleDelete = (selectedId) => {
    let remainingItems = todos.map((t) => {
      return t.id == id
        ? (t = {
            ...t,
            list: t.list.filter((t) => parseInt(t.id) !== parseInt(selectedId)),
          })
        : (t = { ...t });
    });
    setTodos([...remainingItems]);
  };

  const handleEdit = (selectedId) => {
    let editItem = todos
      ?.find((t) => t.id == id)
      .list.find((t) => t.id == selectedId);

    // console.log(editItem);
    setTodo(editItem.todo);
    seteditId(editItem.id);
  };

  const handleCheck = (selectedId) => {
    let checkedItem = selectedList.list.find((todo) => todo.id === id);
    console.log(checkedItem);
    let updatedTodo = todos?.map((t) => {
      return t.id == id
        ? (t = {
            ...t,
            list: selectedList.list.map((t) => {
              return t.id == selectedId
                ? (t = { ...t, checked: !t.checked })
                : (t = { ...t });
            }),
          })
        : (t = { ...t });
    });
    setTodos(updatedTodo);
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(todos));
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
          {/* {console.log(selectedList)} */}
          {selectedList &&
            selectedList.list?.map((y, index) => {
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
