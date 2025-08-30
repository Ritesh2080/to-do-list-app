import "./App.css";
import Navbar from "./components/Navbar";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    console.log("inside effect");
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }else{
      localStorage.removeItem("todos");
    }
  }, [todos]);

  // const saveToLS = () =>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  // }

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    // saveToLS()
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS()
  };

  const handleDelete = (id) => {
    console.log("delete");

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    // saveToLS()
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // saveToLS()
  };

  return (
    <>
      <Navbar />
      <div className=" w-full bg-violet-100 min-h-[80vh] md:w-1/2 mx-auto  text-black rounded-xl my-3 pb-2">
        <h1 className="font-bold text-center text-2xl py-2">
          iTask - Manage your todos at one place
        </h1>
        <h2 className="font-bold text-xl mx-2">Add a todo</h2>
        <div className="flex gap-2 my-2 mx-2">
          <input
            className="w-full p-3 rounded-2xl bg-white text-black"
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={todo}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="font-bold text-white bg-green-700 disabled:bg-green-400 hover:bg-green-900 px-4 py-2 rounded-full cursor-pointer"
          >
            Save
          </button>
        </div>
        <div className="flex gap-2 my-2 mx-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinished}
            name=""
            id="check"
          />
          <label htmlFor="check" className="font-semibold">
            Show Finished
          </label>
        </div>
        <div className="h-[1px] my-4 bg-gray-700 opacity-20 w-3/4 mx-auto"></div>
        <h2 className="font-bold text-xl mx-2">Your todos</h2>
        <div className="flex border-2 border-white rounded-3xl flex-col mx-2 my-2">
          {todos.length === 0 && (
            <div className="font-bold text-xl text-center">
              No todos to display
            </div>
          )}
          {todos.map((item, index) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={
                    todos.length === 1 || index == todos.length - 1
                      ? "flex justify-between align-middle w-full p-4 my-2"
                      : "flex justify-between align-middle w-full border-b-2 border-white p-4 my-2"
                  }
                >
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name={item.id}
                      checked={item.isCompleted}
                      id=""
                    />
                    <p className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </p>
                  </div>
                  <div className="flex gap-1 justify-center items-center">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="font-bold text-white bg-green-700 px-4 py-2 rounded-full cursor-pointer"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="font-bold text-white bg-green-700 px-4 py-2 rounded-full cursor-pointer"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
