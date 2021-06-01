import React, {useEffect} from 'react'
import {TodoType} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { CheckCircleIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'

const todoUrl = 'http://127.0.0.1:5000/todos/'

type TodoListProps = {
    todos: TodoType[],
    getTodos: () => void,
}

function TodoList({getTodos, todos}: TodoListProps) {

    const completeTodo = async (todo: TodoType) => {
        try {
            todo.completed = !todo.completed
            const res = await axios.put(todoUrl + todo.id, todo)
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }
    const editTodo = async (todo: TodoType) => {
        try {
            todo.completed = true
            const res = await axios.put(todoUrl + todo.id, todo)
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (todo: TodoType) => {
        try {
            const res = await axios.delete(todoUrl + todo.id)
            console.log(res)
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const todoListItems = todos.sort((a,b) => a.id - b.id).map(item => {
        return (
            <div key={item.id} className="grid grid-cols-11 border-2 bg-gray-100  rounded-md border-gray-500 my-2">
                <p className="text-pink-400 col-span-10 text-lg py-1 pl-2 font-normal ">
                    {item.task}
                </p>
                    
                <div className="flex justify-between items-center p-1">     
                <CheckCircleIcon onClick={() => {
                    completeTodo(item)
                }} className={`cursor-pointer h-5 w-5 ${item.completed ? 'text-green-500' : 'text-red-500'}`} />
                <PencilAltIcon  onClick={() => {
                    editTodo(item)
                }} className=" cursor-pointer h-5 w-5 text-blue-500"/>
                <TrashIcon onClick={() => {
                    deleteTodo(item)
                }} className="cursor-pointer h-5 w-5 text-red-500"/>
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