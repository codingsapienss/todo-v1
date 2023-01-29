import React from "react";
import "./SingleTodoUi.css";
import { useState } from "react";

export default function SingleTodoUi() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, seteditId] = useState(0)

//   localStorage.setItem("todo", JSON.stringify([...todos]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId) {
      let editedItem = todos.find((i)=>{
          return i.id === editId
      })

      let updatedTodo = todos.map ((x)=>{
       return x.id === editedItem.id ? x = {id : x.id, todo}  : x= {id :x.id , todo : x.todo}
      })

      setTodos(updatedTodo)
      seteditId(0);
      setTodo("")
      return;
    }


    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
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
        let editItem = todos.find((y)=>{ return y.id === id})
        setTodo(editItem.todo)
        seteditId(editItem.id)
  };

  return (
    <div>
      <div className="container ">
        <div className="input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="inputTxt"
              value={todo}
              placeholder="Add your todo..."
              onChange={(e) => {
                setTodo(e.target.value);
                // console.log(todo);
              }}
            />
            <button type="submit"> {(editId) ? "Edit Todo" : "Add Todo"}</button>
          </form>
          <hr/>
        </div>
        <div className="todo-list">
          <ul>
            {todos.map((y) => {
              return (
                <li>
                  <span key="y.id">{y.todo}</span>
                  <button onClick={() => {handleEdit(y.id)}}>Edit </button>
                  <button onClick={() => handleDelete(y.id)}> Delete</button>
                </li> );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
