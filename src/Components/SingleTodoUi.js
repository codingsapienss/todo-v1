import React, { useRef } from "react";
import "./Style.css";
import "../Global.css";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleTodoUi() {
  const [todo, setTodo] = useState("");
  const [allTodoData, setAllTodoData] = useState(
    JSON.parse(localStorage.getItem("todoListData")) || []
  );
  const [editId, setEditId] = useState(0);

  const inputRef = useRef();
  const { id } = useParams();

  const selectedTodoList = allTodoData?.find((singleList) => {
    return parseInt(singleList.id) === parseInt(id);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      let selectedTodo = selectedTodoList.list.find((singleTodo) => {
        return parseInt(singleTodo.id) === parseInt(editId);
      });

      if (!selectedTodo) {
        let updatedTodoData = allTodoData.map((singleList) => {
          return parseInt(singleList.id) === parseInt(id)
            ? (singleList = {
                ...singleList,
                list: [
                  ...singleList.list,
                  { id: Date.now(), todo: todo, checked: false },
                ],
              })
            : (singleList = { ...singleList });
        });

        setAllTodoData(updatedTodoData);
        setTodo("");
        setEditId(0);
        return;
      }

      let updatedTodoData = allTodoData?.map((singleList) => {
        return parseInt(singleList.id) === parseInt(id)
          ? (singleList = {
              ...singleList,
              list: selectedTodoList.list.map((singleTodo) => {
                return parseInt(singleTodo.id) === parseInt(editId)
                  ? (singleTodo = { ...singleTodo, todo: todo })
                  : (singleTodo = { ...singleTodo });
              }),
            })
          : (singleList = { ...singleList });
      });
      setAllTodoData(updatedTodoData);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      let updatedTodoData = allTodoData?.map((singleList) => {
        return parseInt(singleList.id) === parseInt(id)
          ? (singleList = {
              ...singleList,
              list: [
                ...singleList.list,
                { id: Date.now(), todo: todo, checked: false },
              ],
            })
          : (singleList = { ...singleList });
      });
      setAllTodoData(updatedTodoData);
      setTodo("");
    }
  };

  const handleDelete = (selectedId) => {
    let remainingItems = allTodoData.map((singleList) => {
      return parseInt(singleList.id) === parseInt(id)
        ? (singleList = {
            ...singleList,
            list: singleList.list.filter(
              (singleTodo) => parseInt(singleTodo.id) !== parseInt(selectedId)
            ),
          })
        : (singleList = { ...singleList });
    });
    setAllTodoData([...remainingItems]);
  };

  const handleEdit = (selectedId) => {
    let editItem = allTodoData
      ?.find((singleList) => parseInt(singleList.id) === parseInt(id))
      .list.find(
        (singleTodo) => parseInt(singleTodo.id) === parseInt(selectedId)
      );
    setTodo(editItem.todo);
    setEditId(editItem.id);
  };

  const handleCheck = (selectedId) => {
    let updatedTodoData = allTodoData?.map((singleList) => {
      return parseInt(singleList.id) === parseInt(id)
        ? (singleList = {
            ...singleList,
            list: selectedTodoList.list.map((singleTodo) => {
              return parseInt(singleTodo.id) === parseInt(selectedId)
                ? (singleTodo = { ...singleTodo, checked: !singleTodo.checked })
                : (singleTodo = { ...singleTodo });
            }),
          })
        : (singleList = { ...singleList });
    });
    setAllTodoData(updatedTodoData);
  };

  useEffect(() => {
    localStorage.setItem("todoListData", JSON.stringify(allTodoData));
  }, [allTodoData]);

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
            {editId ? <FaEdit /> : <FaPlus />}
          </button>
        </form>

        <hr />
      </div>

      <div className="todo-list">
        <ul>
          {selectedTodoList &&
            selectedTodoList.list?.map((singleTodo, index) => {
              return (
                <li
                  className={singleTodo.checked ? "checked" : ""}
                  key={singleTodo.id}
                >
                  <input
                    checked={singleTodo.checked}
                    onChange={() => {
                      handleCheck(singleTodo.id);
                    }}
                    id="checkbox"
                    type="checkbox"
                  />

                  <span>{`${index + 1}. ${singleTodo.todo}`}</span>
                  <FaEdit
                    className="editBtn btn"
                    onClick={() => {
                      handleEdit(singleTodo.id);
                      inputRef.current.focus();
                    }}
                  />
                  <MdDeleteOutline
                    className="deleteBtn btn"
                    onClick={() => handleDelete(singleTodo.id)}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
