import './TasksFilter.css';

export default function TasksFilter({ filterChanged, filter }) {
  return (
    <ul className="filters">
      <li>
        {/* eslint-disable-next-line */}
        <button className={filter === 'All' ? 'selected' : null} onClick={(event) => filterChanged(event)}>
          All
        </button>
      </li>
      <li>
        {/* eslint-disable-next-line */}
        <button className={filter === 'Active' ? 'selected' : null} onClick={(event) => filterChanged(event)}>
          Active
        </button>
      </li>
      <li>
        {/* eslint-disable-next-line */}
        <button className={filter === 'Completed' ? 'selected' : null} onClick={(event) => filterChanged(event)}>
          Completed
        </button>
      </li>
    </ul>
  );
}
