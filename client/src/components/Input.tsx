import React from 'react'

function Input() {
    return (
        <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Add todo..."
            name="s" 
            className="input"
        />
        <button className="btn success"  type="submit">Add Item</button>
    </form>
    )
}

export {Input}