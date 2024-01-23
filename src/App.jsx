import { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length !== 0) {
        setData(
          data.map((obj) => {
            if (obj.timer > 0 && obj.timerStatus) {
              obj.timer -= 1;
            }
            return obj;
          })
        );
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const newData = (text, done, time, timer, timerStatus) => {
    return {
      id: Math.random(),
      text,
      done,
      time,
      timer,
      timerStatus,
    };
  };

  const handleKeyDown = (text, timer) => {
    setData([...data, newData(text, false, new Date().toString(), timer, false)]);
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

  const timerStart = (id) => {
    setData(
      data.map((obj) => {
        if (id === obj.id) {
          obj.timerStatus = true;
        }
        return obj;
      })
    );
  };

  const timerPause = (id) => {
    setData(
      data.map((obj) => {
        if (id === obj.id) {
          obj.timerStatus = false;
        }
        return obj;
      })
    );
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
          timerStart={timerStart}
          timerPause={timerPause}
        />
      </section>
      <Footer data={data} filter={filter} filterChanged={filterChanged} taskClearDeleted={taskClearDeleted} />
    </section>
  );
}

export default App;
