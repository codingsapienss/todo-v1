import "./Style.css";
import { FaEdit } from "react-icons/fa";

const lists = [
  {
    id: Date.now(),
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
        <FaEdit id="addListBtn" />
      </div>
    </div>
  );
};

export default MainPageUI;
