import './TaskList.css';

import Task from '../Task/Task';

export default function TaskList({ data, filter, taskIsDone, taskDeleted, taskEditedData, timerStart, timerPause }) {
  const tasks = data.map((item) => {
    if (filter === 'All') {
      return (
        <Task
          id={item.id}
          text={item.text}
          key={item.id}
          done={item.done}
          time={item.time}
          timer={item.timer}
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
          timerStart={timerStart}
          timerPause={timerPause}
        />
      );
    }
    if (filter === 'Active' && !item.done) {
      return (
        <Task
          id={item.id}
          text={item.text}
          key={item.id}
          done={item.done}
          time={item.time}
          timer={item.timer}
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
          timerStart={timerStart}
          timerPause={timerPause}
        />
      );
    }
    if (filter === 'Completed' && item.done) {
      return (
        <Task
          id={item.id}
          text={item.text}
          key={item.id}
          done={item.done}
          time={item.time}
          timer={item.timer}
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
          timerStart={timerStart}
          timerPause={timerPause}
        />
      );
    }
    return null;
  });
  return <ul className="todo-list">{tasks}</ul>;
}
