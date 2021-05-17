import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const fetchHelper = async () => {
    try {
      let response = await axios.get('http://localhost:5000/stock/AMD');
      let payload = response.data;
      setData(payload);
    } catch (err) {
      console.log(err);
    }
  };
  const addStock = async () => {
    try {
      let res = await axios.put('http://localhost:5000/stock/TSLA', {
        ticker: 'TSLA',
        price: 650,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    addStock();
    fetchHelper();
    console.log(data);
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{data ? data.name : ''}</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
