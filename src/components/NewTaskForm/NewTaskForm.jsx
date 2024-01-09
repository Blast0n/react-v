import './NewTaskForm.css';

export default function NewTaskForm({ handleKeyDown }) {
  return (
    <input className="new-todo" placeholder="What needs to be done?" onKeyDown={(event) => handleKeyDown(event)} />
  );
}
