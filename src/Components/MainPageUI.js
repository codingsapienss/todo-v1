/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import "./Style.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const MainPageUI = () => {
  const navigate = useNavigate();

  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("Lists")) || []
  );

  const [newId, setNewId] = useState(null);

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));

    if (newId !== null) {
      navigate(`/todo/${newId}`);
      setNewId(null);
    }
  }, [lists, newId]);

  // const handleAddList = async () => {
  //   const newList = { id: Date.now(), list: [] };
  //   await setLists((prev) => [...prev, newList]);
  //   navigate(`/todo/${newList.id}`);
  // };

  const handleAddList = () => {
    const newList = { id: Date.now(), list: [] };
    setLists((prev) => [...prev, newList]);
    setNewId(newList.id);
  };

  const handleDelete = (e, selectedId) => {
    e.stopPropagation();
    let remainingItems = lists.filter((li) => li.id != selectedId);
    setLists(remainingItems);
  };
  return (
    <div className="mainContainer">
      <h1>My Todo</h1>

      <div className="notesLists">
        {lists.length < 1 && (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Empty
          </p>
        )}

        {lists &&
          lists.map((li, i) => {
            return (
              <ul
                onClick={() => {
                  navigate(`/todo/${li.id}`);
                }}
                id="singleList"
                key={i}
              >
                <li>
                  <span id="title">
                    {i + 1}. {li.list.length > 0 ? li.list[0].todo : "empty"}
                  </span>

                  <span id="date">
                    -
                    {new Date(li.id).toLocaleString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <MdDeleteOutline
                    className="deleteBtn btn"
                    onClick={(e) => handleDelete(e, li.id)}
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
