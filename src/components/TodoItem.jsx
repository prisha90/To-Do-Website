import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const [todos, setTodos] = useContext(TodoContext);

  const message = "are you sure?";



  //goes through each item in the array using t as the current element.
  const toggleComplete = () => {
    const newTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
  };

  const deleteTodo = () => {
    let conf = window.confirm(message);
    if (conf === true) {
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    }

  };

  return (
    <div className={`todo-item ${todo.priority} ${todo.completed ? 'completed' : 'incomplete'}`}>
      <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        <input className="checkbox" type="checkbox" onChange={toggleComplete} checked={todo.completed} />
        {todo.title}
      </h3>
      <p>Priority: {todo.priority}</p>
      {/* <button className="btn-complete" onClick={toggleComplete}>
        {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button> */}
      <button className="btn-delete" onClick={deleteTodo}>Delete</button>
    </div>
  );
};

export default TodoItem;