import React, { useEffect, useState, useRef } from 'react';
import { TodoType } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  CheckCircleIcon,
  PencilAltIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/outline';

const todoUrl = 'http://127.0.0.1:5000/todos/';

type TodoListProps = {
  todos: TodoType[];
  getTodos: () => void;
};

function TodoList({ getTodos, todos }: TodoListProps) {
  const [currentTodo, setCurrentTodo] = useState<string>('');

  const completeTodo = async (todo: TodoType) => {
    try {
      todo.completed = !todo.completed;
      const res = await axios.put(todoUrl + todo.id, todo);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const editTodo = async (todo: TodoType) => {
    try {
      todo.completed = true;
      const res = await axios.put(todoUrl + todo.id, todo);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todo: TodoType) => {
    try {
      const res = await axios.delete(todoUrl + todo.id);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const todoListItems = todos
    .sort((a, b) => a.id - b.id)
    .map((item) => {
      return (
        <TodoItem
          item={item}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          setCurrentTodo={setCurrentTodo}
          currentTodo={currentTodo}
        />
      );
    });

  return <div className=''>{todoListItems}</div>;
}

type TodoItemTypes = {
    item: any,
    completeTodo: any,
    deleteTodo: any,
    setCurrentTodo: any,
    currentTodo: any
}

function TodoItem({
  item,
  completeTodo,
  deleteTodo,
  setCurrentTodo,
  currentTodo,
}: TodoItemTypes) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo(e.target.value);
  };
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
      if (editMode) {
        inputRef.current?.focus?.()
      }
  }, [editMode])

  return (
    <div
      onClick={() => {
        if (!editMode) {
          completeTodo(item);
        }
      }}
      key={item.id}
      className='grid grid-cols-11 border-2 bg-gray-100  rounded-md border-blue-500 my-2'
    >
      {editMode ? (
        <input
          type='text'
          ref={inputRef}
          placeholder='Edit todo...'
          className='text-blue-400 placeholder-opacity-75 placeholder-blue-400 bg-gray-100 col-span-10 text-lg py-1 pl-2 font-normal focus:border-transparent focus:outline-none border-none rounded-md border-blue-500'
          value={currentTodo}
          onChange={handleInputChange}
        />
      ) : (
        <p
          className={`${
            item.completed && 'line-through'
          } cursor-pointer text-blue-400 col-span-10 text-lg py-1 pl-2 font-normal`}
        >
          {item.task}
        </p>
      )}

      <div className='flex justify-between items-center p-1'>
        {editMode ? (
          <XCircleIcon
            onClick={() => {
              setEditMode(false);
            }}
            className='h-5 w-5 cursor-pointer text-red-500'
          />
        ) : (
          <CheckCircleIcon
            className={`h-5 w-5 cursor-pointer ${
              item.completed ? 'text-green-500' : 'text-blue-500'
            }`}
          />
        )}
        <PencilAltIcon
          onClick={() => {
            setEditMode(!editMode);
            // editTodo(item)
          }}
          className={'cursor-pointer h-5 w-5 text-blue-500'}
        />
        <TrashIcon
          onClick={() => {
            deleteTodo(item);
          }}
          className='cursor-pointer h-5 w-5 text-red-500'
        />
      </div>
    </div>
  );
}

export { TodoList };
