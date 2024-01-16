import { useEffect, useState } from "react";
import "./Style.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
              <ul id="singleList" key={i}>
                <li>
                  <span id="title">
                    {i + 1}. {li.title}
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
