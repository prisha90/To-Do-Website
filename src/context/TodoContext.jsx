import { createContext, useState } from "react";

export const TodoContext = createContext();

//gets todos from local storage. if todo are saved, it will copy to website otherwise there will be an empty array
export const TodoProvider = (props) => {
    const getTodos = JSON.parse(localStorage.getItem('todos'));
    const [todos, setTodos] = useState(getTodos ? getTodos : []);

    //sets the const todos and settodos for its children
    return (
        <TodoContext.Provider value={[todos, setTodos]}>
            {props.children}
        </TodoContext.Provider>
    );
}