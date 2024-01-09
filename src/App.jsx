import { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');

  const newData = (text, done, time) => {
    return {
      id: Math.random(),
      text,
      done,
      time,
    };
  };

  const handleKeyDown = (event) => {
    if (event.target.value && event.key === 'Enter') {
      setData([...data, newData(event.target.value, false, new Date().toString())]);
      event.target.value = '';
    }
  };

  const taskIsDone = (id) => {
    setData(
      data.map((obj) => {
        if (id === obj.id) {
          obj.done = !obj.done;
        }
        return obj;
      })
    );
  };

  const taskDeleted = (id) => {
    setData(data.filter((obj) => obj.id !== id));
  };

  const taskClearDeleted = () => {
    setData(data.filter((obj) => !obj.done));
  };

  const taskEditedData = (event, id) => {
    setData(
      data.map((obj) => {
        if (id === obj.id) {
          obj.text = event.target.value;
        }
        return obj;
      })
    );
  };

  const filterChanged = (event) => {
    setFilter(event.target.innerText);
  };

  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <NewTaskForm handleKeyDown={handleKeyDown} />
        <TaskList
          data={data}
          filter={filter}
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
        />
      </section>
      <Footer data={data} filter={filter} filterChanged={filterChanged} taskClearDeleted={taskClearDeleted} />
    </section>
  );
}

export default App;
