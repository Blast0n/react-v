import { useState } from 'react';
import './NewTaskForm.css';

export default function NewTaskForm({ handleKeyDown }) {
  const [value, setValue] = useState({
    text: '',
    min: '',
    sec: '',
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value) {
      const text = event.target[0].value;
      const timer = event.target[1].value * 60 + +event.target[2].value;
      handleKeyDown(text, timer);
      setValue({
        text: '',
        min: '',
        sec: '',
      });
    }
  };
  return (
    <form className="new-todo-form" onSubmit={onSubmitHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value.text}
        onChange={(e) => setValue({ ...value, text: e.target.value })}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        value={value.min}
        onChange={(e) => setValue({ ...value, min: e.target.value })}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        value={value.sec}
        onChange={(e) => setValue({ ...value, sec: e.target.value })}
      />
      <input className="hidden" type="submit" />
    </form>
  );
}
