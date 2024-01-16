/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import "./Style.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const MainPageUI = () => {
  const navigate = useNavigate();

  const [allTodoData, setAllTodoData] = useState(
    JSON.parse(localStorage.getItem("todoListData")) || []
  );

  const [newId, setNewId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todoListData", JSON.stringify(allTodoData));

    if (newId !== null) {
      navigate(`/todo/${newId}`);
      setNewId(null);
    }
  }, [allTodoData, newId]);

  const handleAddList = () => {
    const newList = { id: Date.now(), list: [] };
    setAllTodoData((prev) => [...prev, newList]);
    setNewId(newList.id);
  };

  const handleDelete = (e, selectedId) => {
    e.stopPropagation();
    let remainingItems = allTodoData.filter(
      (singleList) => parseInt(singleList.id) !== parseInt(selectedId)
    );
    setAllTodoData(remainingItems);
  };
  return (
    <div className="mainContainer">
      <h1>My Todo</h1>

      <div className="notesLists">
        {allTodoData.length < 1 && (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Empty
          </p>
        )}

        {allTodoData &&
          allTodoData.map((singleList, index) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/todo/${singleList.id}`);
                }}
                id="singleList"
                key={singleList.id}
              >
                <li>
                  <span id="title">
                    {index + 1}.
                    {singleList.list.length > 0
                      ? singleList.list[0].todo.length > 10
                        ? `${singleList.list[0].todo.slice(0, 10)}...`
                        : singleList.list[0].todo
                      : " empty"}
                  </span>

                  <span id="date">
                    -
                    {new Date(singleList.id).toLocaleString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <MdDeleteOutline
                    className="deleteBtn btn"
                    onClick={(e) => handleDelete(e, singleList.id)}
                  />
                </li>
              </ul>
            );
          })}
      </div>

      <div className="addListBtn">
        <FaEdit onClick={handleAddList} id="addListBtn" />
      </div>
    </div>
  );
};

export default MainPageUI;
