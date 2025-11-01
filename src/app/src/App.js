import { useTodos } from './hooks/useTodos';
import { useState } from 'react';
import {validateTodoText} from './utils/validation'
import './App.css';


export function App() {
  const { todos, loading, addTodo,  } = useTodos();
  const [todo, setTodo] = useState("")


  const handleTodoSubmit = async (event) => {
    event.preventDefault()
    if(!validateTodoText(todo)){
      return;
    }
    const res = await addTodo(todo)
    if(!res.success){
      console.log(res.error)
    }else{
      setTodo("")
    }
  }
  return (
    <div className="App">
      <div>
        {loading && <p>Loading...</p>}
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </div>


       <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleTodoSubmit}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input type="text" value={todo} onChange={(e) => { setTodo(e.target.value) }} />
          </div>
          <div style={{ "marginTop": "5px" }}>
            <button>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
