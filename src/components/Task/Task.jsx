import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

export default function Task({ id, text, done, time, taskIsDone, taskDeleted, taskEditedData }) {
  const [edit, setEdit] = useState(false);
  const [timeCreated, setTimeCreated] = useState(formatDistanceToNow(time, { includeSeconds: true }));
  let classNameSwitch = '';

  setInterval(() => {
    if (formatDistanceToNow(time, { includeSeconds: true }) !== timeCreated) {
      setTimeCreated(formatDistanceToNow(time, { includeSeconds: true }));
    }
  }, 5000);

  if (edit) {
    classNameSwitch = 'editing';
  } else if (done) {
    classNameSwitch = 'completed';
  } else {
    classNameSwitch = undefined;
  }

  const taskIsEdit = () => {
    setEdit((prev) => !prev);
  };

  const taskisEdited = (event) => {
    if (event.key === 'Enter') {
      setEdit((prev) => !prev);
    }
  };
  return (
    <li className={classNameSwitch}>
      <div className="view">
        <input className={done ? 'toggle clicked' : 'toggle'} type="checkbox" onClick={() => taskIsDone(id)} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label>
          <span className="description">{text}</span>
          <span className="created">created {timeCreated} ago</span>
        </label>
        {/* eslint-disable-next-line */}
        <button className="icon icon-edit" type="button" onClick={taskIsEdit} />
        {/* eslint-disable-next-line */}
        <button className="icon icon-destroy" type="button" onClick={() => taskDeleted(id)} />
      </div>
      {edit && (
        <input
          type="text"
          className="edit"
          defaultValue={text}
          onChange={(event) => taskEditedData(event, id)}
          onKeyDown={(event) => taskisEdited(event)}
        />
      )}
    </li>
  );
}
