import React, { useState} from 'react'
import {TodoType} from '../App'

type TodoListProps = {
    todos: TodoType[],
}

function TodoList({todos}: TodoListProps) {
    const todoListItems = todos.map(item => {
        return (
        <li>
            {item.task}
        </li>
        )
    })
    return (
        <div>
          <ul>
           {todoListItems}
         </ul>
        </div>
       
    )
}



export {TodoList}