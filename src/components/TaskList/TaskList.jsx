import './TaskList.css';

import Task from '../Task/Task';

export default function TaskList({ data, filter, taskIsDone, taskDeleted, taskEditedData }) {
  const tasks = data.map((item) => {
    return (
      <Task
        id={item.id}
        text={item.text}
        key={item.id}
        done={item.done}
        filter={filter}
        time={item.time}
        timer={item.timer}
        taskIsDone={taskIsDone}
        taskDeleted={taskDeleted}
        taskEditedData={taskEditedData}
      />
    );
  });
  return <ul className="todo-list">{tasks}</ul>;
}
