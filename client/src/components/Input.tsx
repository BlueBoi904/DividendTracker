import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';

type InputProps = {
  todo: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};
function Input({ todo, handleInputChange, onSubmit }: InputProps) {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (todo.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [todo]);
  return (
    <form className='grid grid-cols-11 pb-4' action='/' method='get'>
      <input
        type='text'
        id='header-search'
        placeholder='Add todo...'
        name='s'
        className='p-2 col-span-10 rounded-md border-2 placeholder-opacity-75 placeholder-blue-400 text-blue-400 bg-gray-100 border-blue-500'
        value={todo}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <button
        disabled={disabled}
        onClick={onSubmit}
        className='p-2 text-blue-400 text-center bg-gray-100 rounded-md border-2 border-blue-500'
        type='button'
      >
        Add Item
      </button>
    </form>
  );
}

export { Input };
