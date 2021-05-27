import React from 'react'
import {TodoType} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { CheckCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'


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
            <div className="grid grid-cols-11 border-2 bg-gray-100  rounded-md border-pink-300 my-1">
                <p className="col-span-10 text-lg py-1 pl-1 font-normal ">
                    {item.task}
                </p>
                    
                <div className="flex justify-between items-center p-1">
                <CheckCircleIcon className="h-5 w-5 text-green-500"/>
                <PencilAltIcon className="h-5 w-5 text-blue-500"/>
                <TrashIcon className="h-5 w-5 text-red-500"/>
                </div>
            </div>
        
        )
    })


    return (
          <div className="">
              {todoListItems}
          </div>
           

    )
}



export {TodoList}