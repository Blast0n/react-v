import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

export default function Task({ id, text, done, time, timer, taskIsDone, taskDeleted, taskEditedData }) {
  const [edit, setEdit] = useState(false);
  const [timeCreated, setTimeCreated] = useState(formatDistanceToNow(time, { includeSeconds: true }));
  const [timerValue, setTimerValue] = useState(timer);
  const [timerStatus, setTimerStatus] = useState(false);
  useEffect(() => {
    const intervalCreated = setInterval(() => {
      if (timeCreated !== formatDistanceToNow(time, { includeSeconds: true })) {
        setTimeCreated(formatDistanceToNow(time, { includeSeconds: true }));
      }
    }, 5000);
    if (timerStatus && timerValue > 0) {
      const interval = setInterval(() => {
        setTimerValue(timerValue - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return () => {
      clearInterval(intervalCreated);
    };
  }, [timerValue, timerStatus]);

  function toTime(sec) {
    const minutes = Math.floor(sec / 60);
    let seconds = sec - minutes * 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  let classNameSwitch = '';
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

  const classNameFilter = 'view';

  const timerPlay = () => {
    if (!timerStatus) {
      setTimerStatus(true);
    }
  };

  const timerPause = () => {
    if (timerStatus) {
      setTimerStatus(false);
    }
  };

  const handlerDone = () => {
    taskIsDone(id);
    setTimerStatus(false);
  };

  return (
    <li className={classNameSwitch}>
      <div className={classNameFilter}>
        <input className={done ? 'toggle clicked' : 'toggle'} type="checkbox" onClick={handlerDone} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
        <label>
          <span className="title">{text}</span>
          {!!timer && (
            <span className="description">
              {/* eslint-disable-next-line */}
              <button className="icon icon-play" onClick={timerPlay}></button>
              {/* eslint-disable-next-line */}
              <button className="icon icon-pause" onClick={timerPause}></button>
              <span className="timer">{toTime(timerValue)}</span>
            </span>
          )}
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
