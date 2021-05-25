import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './components/Input'
import {TodoList} from './components/TodoList'
import axios from 'axios';

export type TodoType = {
  task: string,
}

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
}

  const getTodos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/todos')
            const resArr: TodoType[] = []
            const obj = res.data
            for (let key in obj){
              resArr.push(obj[key])
            }
            setTodos(resArr)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const onSubmit = async () =>  {
      // Make post call to database
      const res = await axios.post('http://127.0.0.1:5000/todos', {"task": todo})
    }
  return (
    <div className="App">
     <h1>To Do list</h1>
     <Input onSubmit={onSubmit} todo={todo} handleInputChange={handleInputChange} />
     <TodoList todos={todos}/>
    </div>
  );
}

export default App;
