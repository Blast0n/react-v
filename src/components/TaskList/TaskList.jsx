import './TaskList.css';

import Task from '../Task/Task';

export default function TaskList({ data, filter, taskIsDone, taskDeleted, taskEditedData }) {
  const tasks = data.map((item) => {
    if (filter === 'All') {
      return (
        <Task
          id={item.id}
          text={item.text}
          key={item.id}
          done={item.done}
          time={item.time}
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
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
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
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
          taskIsDone={taskIsDone}
          taskDeleted={taskDeleted}
          taskEditedData={taskEditedData}
        />
      );
    }
    return null;
  });
  return <ul className="todo-list">{tasks}</ul>;
}
