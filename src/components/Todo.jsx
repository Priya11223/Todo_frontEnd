import React, {  useEffect, useState } from 'react'
import "../styleTodo.css"
import axios from 'axios'

const api = "http://localhost:8081/todo"

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState()

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${api}`);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleClick = async () =>{
        const todo = {"work":input}
        try {
          const data = await axios.post(`${api}/create`,todo)
          setTodos([...todos,data.data])
        } catch (error) {
          console.log("The error is ",error)
        }
    }

    const removeTodo = async (id) => {
        try {
          await axios.delete(`${api}/delete/${id}`)
          setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
          console.log("error deleting :", error)
        }
    }
    

  return (    
    <div className='container'>
        <input type="text" placeholder='Enter the task' onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={handleClick}>ADD</button>

        <ul className="todos-list">
          {todos.map(({id,work}) => (
            <li className='todo' key={id}>
              <span>{work}</span>
              <button className='close' onClick={() => removeTodo(id)}>X</button>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Todos