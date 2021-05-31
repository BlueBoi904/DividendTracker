import userEvent from '@testing-library/user-event'
import React, { useEffect, useState} from 'react'

type InputProps = {
    todo: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: () => void
  }
function Input({todo, handleInputChange, onSubmit }: InputProps) {
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (todo.length > 0){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [todo])
    return (
        <form className="grid grid-cols-11 pb-4" action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Add todo..."
            name="s" 
            className="p-2 text-opacity-60 col-span-10 rounded-md border-2 placeholder-pink-400 bg-gray-100 border-gray-500"
            value={todo}
            onChange={handleInputChange}
        />
        <button disabled={disabled} onClick={onSubmit} className="p-2 text-pink-400 text-center bg-gray-100 rounded-md border-2 border-gray-500"  type="button">Add Item</button>
    </form>
    )
}



export {Input}