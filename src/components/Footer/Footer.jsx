import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

export default function Footer({ data, filterChanged, filter, taskClearDeleted }) {
  const count = data.reduce((result, obj) => {
    if (!obj.done) {
      result += 1;
    }
    return result;
  }, 0);

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter filter={filter} filterChanged={filterChanged} />
      {/* eslint-disable-next-line */}
      <button className="clear-completed" onClick={taskClearDeleted}>
        Clear completed
      </button>
    </footer>
  );
}
