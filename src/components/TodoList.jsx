import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const message = "No To-Do found. Please add To-Do ";
  
  const [todos, setTodos] = useContext(TodoContext);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos)
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "notCompleted") return !todo.completed;
    return true;
  });

  //compares arrays a and b and sorts them based on the priority order
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortOrder === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div>
      <div className="panel">
        <button className="all" onClick={() => setFilter("all")}>All</button>
        <button className="completed" onClick={() => setFilter("completed")}>Completed</button>
        <button className="notcomp" onClick={() => setFilter("notCompleted")}>Not Completed</button>
        <button className="prior" onClick={() => setSortOrder((prevValue) => {
          if (prevValue === "priority")
            return "default"
          else return "priority"
        })}>Sort by Priority</button>
      </div>
      {/* add a scroll */}
      <div className="scroll" style={{ height: '400px', overflowY: 'scroll' }}>
        {/* list of TodoItem components corresponding to a to-do item in the sortedTodos array. */}
      {todos.length > 0 ? (
        sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <h4>{message}</h4>
      )}
      </div>

      
    </div>
  );
};

export default TodoList;