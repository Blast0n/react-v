import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

export default function Task({
  id,
  text,
  done,
  time,
  timer,
  taskIsDone,
  taskDeleted,
  taskEditedData,
  timerStart,
  timerPause,
}) {
  const [edit, setEdit] = useState(false);

  let classNameSwitch = '';

  function toTime(sec) {
    const minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

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
          <span className="title">{text}</span>
          <span className="description">
            {/* eslint-disable-next-line */}
            <button className="icon icon-play" onClick={() => timerStart(id)}></button>
            {/* eslint-disable-next-line */}
            <button className="icon icon-pause" onClick={() => timerPause(id)}></button>
            <span className="timer">{toTime(timer)}</span>
          </span>
          <span className="created">created {formatDistanceToNow(time, { includeSeconds: true })} ago</span>
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
