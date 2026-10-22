import React from 'react';
import { formatDate, urgency } from '../domain/urgency.js';
import Button from './Button.jsx';

export default function TaskCard({ task, today, onToggle, onDelete }) {
  const status = urgency(task, today);
  return (
    <article className={`task-card ${task.completed ? 'task-completed' : ''}`} data-task-id={task.id}>
      <p className="task-subject">{task.subject}</p>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-date">Срок: <time dateTime={task.dueDate}>{formatDate(task.dueDate)}</time></p>
      <p className="task-status"><span>{task.completed ? 'Выполненное' : 'Активное'}</span><span className={`status status-${status.className}`}>{status.label}</span></p>
      <div className="task-actions">
        <label className="completion-control">
          <input type="checkbox" checked={task.completed} aria-label={`Выполнение: ${task.title}`} onChange={() => onToggle(task.id)} />
          <span>{task.completed ? 'Выполнено' : 'Отметить выполненным'}</span>
        </label>
        <a className="button button-quiet" href={`#edit/${task.id}`}>Редактировать</a>
        <Button variant="quiet" onClick={() => onDelete(task)}>Удалить</Button>
      </div>
    </article>
  );
}
