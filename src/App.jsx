import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '' && !tasks.includes(newTask)) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleBackspace = (e) => {
    if (e.key === 'Backspace' && newTask === '') {
      const updatedTasks = [...tasks];
      updatedTasks.pop();
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleBackspace);
    return () => {
      window.removeEventListener('keydown', handleBackspace);
    };
  }, [newTask, tasks]);

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nový úkol..."
        />
        <button onClick={addTask}>Přidat úkol</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>Odstranit</button>
          </li>
        ))}
      </ul>
      <h4>Pro přidání úkolu stiskni enter a pro odebrání stiskni backspace <br />
      <br />
      Stejný úkol nelze přidat vícekrát</h4>
    </div>
  );
}

export default App;
