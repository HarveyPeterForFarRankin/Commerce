import './App.css';
import {useEffect} from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/product/products').then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
