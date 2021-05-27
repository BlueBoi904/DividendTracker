import React from 'react'
import {TodoType} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';


type TodoListProps = {
    todos: TodoType[],
}

function TodoList({todos}: TodoListProps) {
    // const todoUrl = 'http://127.0.0.1:5000/todos'

    // const editTodo = async (todo: TodoType) => {
    //     try {
    //         const res = await axios.post(todoUrl + todo.id, {"task": todo})
    //     console.log(res)
    //     } catch (error) {

    //     }
    // }

    // const deleteTodo = async () => {
    //     try {

    //     } catch (error) {

    //     }
    // }

    const todoListItems = todos.map(item => {
        return (
            <>
                <div className="col-span-10">
                    {item.task}
                </div>
                    
                <div className="flex justify-between items-center">
                <FontAwesomeIcon  id="green-circle" className="icon" icon={faCheckCircle} />
                <FontAwesomeIcon id="blue-circle" className="icon" icon={faEdit} />
                <FontAwesomeIcon id="red-circle" className="icon" icon={faTimesCircle} />
                </div>
            </>
        
        )
    })


    return (
          <div className="grid grid-cols-11">
              {todoListItems}
          </div>
           

    )
}



export {TodoList}