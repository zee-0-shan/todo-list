import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      const editTodo= todos.find((i)=> i.id === editId);
      const updatedTodos= todos.map((t)=>t.id=== editTodo.id? (t={id:t.id , todo:todo}) : {id:t.id, todo: t.todo})
      setTodos([...updatedTodos])
      setTodo("")
      setEditId(0)
      return
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("")
    }
  }
  const handleEdit=(id)=>{
    const editTodo=todos.find((i)=> i.id===id)
    setTodo(editTodo.todo)
    setEditId(id)
  }
  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id)
    setTodos([...delTodo])
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Todo list App</h1>
        <form id="addTodo" onSubmit={handleSubmit}>
          <input id ="task" type="text" onChange={(e) => { setTodo(e.target.value) }} value={todo} />
          <button  className='btn' id='btn' type='submit'>{editId? "Edit" : "Add"}</button>
        </form>

        <ul id='todoList'>
          {todos.map((t) => (
            <li className="list" key={t.id}>
              <span>{t.todo}</span>
              <div className="buttons">
                <button  className='btn edit' onClick={()=>handleEdit(t.id)}>edit</button>
                <button  className='btn delete' onClick={()=>handleDelete(t.id)}>delete</button>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
}

export default App;
