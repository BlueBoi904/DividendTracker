import React, {useEffect} from 'react'
import axios from 'axios';
function Input() {

    const getTodos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/')
            console.log(res)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])
    return (
        <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Add todo..."
            name="s" 
            className="input"
        />
        <button onClick={() => {
            console.log('click!')
        }} className="btn success"  type="button">Add Item</button>
    </form>
    )
}



export {Input}