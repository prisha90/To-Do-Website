import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../context/TodoContext";


const AddTodo = () => {
  const priorityList = Object.freeze(
    {
      High: "high",
      Medium: "medium",
      Low: "low"
    }
  )
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(priorityList.Low);
  const [todos, setTodos] = useContext(TodoContext);

  const placeHolder = "Add To-Do here";
  const alert = "Field cannot be blank!";

  const addTodo = (e) => {
    e.preventDefault();
    if (title === "") {
      window.alert(alert);
      return;
    }
    //creates new arrray containing all the previous arrays and then resets the input container
    const newTodos = [...todos,
    { id: uuidv4(), title, priority, completed: false },
    ];
    setTodos(newTodos);
    setTitle("");
    setPriority(priorityList.Low);
  };

  return (
    <div className="form-input-container">
      <input
        value={title}
        className="form-input"
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeHolder}
      />
      <select
        value={priority}
        className="form-select"
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value={priorityList.Low}>Low</option>
        <option value={priorityList.Medium}>Medium</option>
        <option value={priorityList.High}>High</option>
      </select>
      <button type="button" className="form-btn" onClick={addTodo}>
        ADD
      </button>
    </div>
  );
};

export default AddTodo;