import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {

  const priorityList = Object.freeze(
    {
      High: "high",
      Medium: "medium",
      Low: "low"
    }
  )

  const [todos, setTodos] = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState(todo.priority);

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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setNewPriority(e.target.value);
  };

  const saveEdit = () => {
    const newTodos = todos.map((t) => 
      t.id === todo.id ? { ...t, title: newTitle, priority: newPriority }  : t
    );
    setTodos(newTodos);
    setIsEditing(false);
  };


  return (
    <div className={`todo-item ${todo.priority} ${todo.completed ? 'completed' : 'incomplete'}`}>
      {isEditing ? (
        <div className="edit-window">
          <input className="edit-input" type="text" value={newTitle} onChange={handleTitleChange} />
          <select className="edit-priority" type="text" value={newPriority} onChange={handlePriorityChange}>
          <option value={priorityList.Low}>Low</option>
          <option value={priorityList.Medium}>Medium</option>
          <option value={priorityList.High}>High</option>
          </select>
          <button className="btn-save" onClick={saveEdit}>Save</button>
          <button className="btn-cancel" onClick={toggleEditMode}>Cancel</button>
        </div>
      ) : (
        <>
          <h3 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <input 
              className="checkbox" type="checkbox" onChange={toggleComplete} checked={todo.completed} 
            />
            {todo.title}
          </h3>
          <p className="font-priority">Priority: {todo.priority}</p>
          <button className="btn-edit" onClick={toggleEditMode}><i className="fas fa-edit"></i></button>
          <button className="btn-delete" onClick={deleteTodo}><i className="fas fa-trash-alt"></i></button>
        </>
      )}
    </div>
  );
};


export default TodoItem;