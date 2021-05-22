import React, { useState} from 'react'

type InputProps = {
    todo: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: () => void
  }
function Input({todo, handleInputChange, onSubmit }: InputProps) {
    return (
        <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Add todo..."
            name="s" 
            className="input"
            value={todo}
            onChange={handleInputChange}
        />
        <button onClick={onSubmit} className="btn success"  type="button">Add Item</button>
    </form>
    )
}



export {Input}