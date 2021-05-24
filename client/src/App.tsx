import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from './components/Input'
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState('')
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
}

  const getTodos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/todos')
            console.log(res)
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
      console.log(res)
    }
  return (
    <div className="App">
     <h1>To Do list</h1>
     <Input onSubmit={onSubmit} todo={todo} handleInputChange={handleInputChange} />
    </div>
  );
}

export default App;
