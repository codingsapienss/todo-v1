import "./Style.css";
import { FaEdit } from "react-icons/fa";

const lists = [
  {
    id: 0,
    title: "The first",
  },
  {
    id: 1,
    title: "The first",
  },
  {
    id: 2,
    title: "The first",
  },
  {
    id: 3,
    title: "The first",
  },
  {
    id: 0,
    title: "The first",
  },
  {
    id: 1,
    title: "The first",
  },
  {
    id: 2,
    title: "The first",
  },
  {
    id: 3,
    title: "The first",
  },
  {
    id: 0,
    title: "The first",
  },
  {
    id: 1,
    title: "The first",
  },
  {
    id: 2,
    title: "The first",
  },
  {
    id: 3,
    title: "The first",
  },
];

const MainPageUI = () => {
  return (
    <div className="mainContainer">
      <h1>My Todo</h1>

      <div className="notesLists">
        {lists.map((li, i) => {
          return (
            <ul key={i}>
              <li>
                <span id="title">
                  {i + 1}. {li.title}
                </span>
                <span id="date">
                  -{" "}
                  {new Date(Date.now()).toLocaleString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    // second: "2-digit",
                  })}
                </span>
              </li>
            </ul>
          );
        })}
      </div>

      <div className="addListBtn">
        <FaEdit id="addListBtn" />
      </div>
    </div>
  );
};

export default MainPageUI;
