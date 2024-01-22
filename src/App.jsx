// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './Components/LoginPage';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/task', { task });

      if (response.status >= 200 && response.status < 300) {
        alert('Task successfully posted');
        setTask('');
        const updatedTasks = await axios.get('http://localhost:3001/api/v1/task');
        setTasks(updatedTasks.data);
      } else {
        alert('Failed');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Navigate to='/app' />} />
        <Route
          path='/app'
          element={
            <div className='app'>
              <div className='app__containTitle'>
                <h1 className='app__title'>The Infamous To-Do List</h1>
              </div>
              <section className='app__mainSection'>
                <div className='app__containInput'>
                  <input
                    onChange={handleChange}
                    value={task}
                    type='text'
                    className='app__input'
                    placeholder='Task'
                  />
                  <button onClick={handleSubmit} type='submit' className='app__submitBtn'>
                    Submit
                  </button>
                </div>
                <div className='app__displayTask'>
                  <h2>Tasks:</h2>
                  <ul>
                    {tasks.map((task) => (
                      <li key={task._id}>{task.task}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
