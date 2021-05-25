import React, { useState} from 'react'
import {TodoType} from '../App'

type TodoListProps = {
    todos: TodoType[],
}

function TodoList({todos}: TodoListProps) {
    const todoListItems = todos.map(item => {
        return (
        <li className="list-item">
            {item.task}
        </li>
        )
    })
    return (
          <ul className="list-container">
           {todoListItems}
         </ul>   
    )
}



export {TodoList}