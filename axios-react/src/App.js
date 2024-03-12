import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const api = axios.create({
  baseURL: 'http://localhost:5001/api/taskFiles/list',
});

function App() {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    api.get('/').then((response) => {
      console.log(response.data);
      setCourse(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {course.map((course) => (<h2 key={course.Contents.key}>{course.contents.key}</h2>))}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
