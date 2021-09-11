import './App.css';
import {useEffect} from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/product/products').then(res => {
      const {data} = res;
      console.log(data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <div>
        Content here
      </div>
      
    </div>
  );
}

export default App;
