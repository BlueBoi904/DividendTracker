import React, {useEffect, useState} from 'react'
import {TodoType} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { CheckCircleIcon, PencilAltIcon, TrashIcon, XCircleIcon} from '@heroicons/react/outline'

const todoUrl = 'http://127.0.0.1:5000/todos/'

type TodoListProps = {
    todos: TodoType[],
    getTodos: () => void,
}

function TodoList({getTodos, todos}: TodoListProps) {
    const [currentTodo, setCurrentTodo] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [currentId, setCurrentId] = useState<number>(0)

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
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTodo(e.target.value)
    }

    const todoListItems = todos.sort((a,b) => a.id - b.id).map(item => {
        return (
            <div onClick={() => {
                if (!editMode) {
                    completeTodo(item)
                }
            }} key={item.id} className="grid grid-cols-11 border-2 bg-gray-100  rounded-md border-gray-500 my-2">
                {editMode ? <input
            type="text"
            placeholder="Edit todo..."
            disabled={item.id !== currentId}
            className="text-pink-400 placeholder-pink-400 bg-gray-100 col-span-10 text-lg py-1 pl-2 font-normal focus:border-transparent focus:outline-none border-none rounded-md border-gray-500"
            value={item.id === currentId ? currentTodo : ''}
            onChange={handleInputChange}
        /> : <p className={`${item.completed && 'line-through'} cursor-pointer text-pink-400 col-span-10 text-lg py-1 pl-2 font-normal`}>
                    {item.task}
                </p>}
                    
                <div className="flex justify-between items-center p-1">     
                {editMode ? <XCircleIcon onClick={() => {
                    setEditMode(false)
                }} className="h-5 w-5 cursor-pointer text-red-500"/> : <CheckCircleIcon className={`h-5 w-5 cursor-pointer ${item.completed ? 'text-green-500' : 'text-red-500'}`} />}
                <PencilAltIcon  onClick={() => {
                    setCurrentId(item.id)
                    setEditMode(!editMode)
                    // editTodo(item)
                }} className={"cursor-pointer h-5 w-5 text-blue-500"} />
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