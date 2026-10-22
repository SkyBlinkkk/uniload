import React from 'react';
import { formatDate, urgency } from '../domain/urgency.js';

export default function TaskCard({ task, today }) {
  const status = urgency(task, today);
  return (
    <article className="task-card" data-task-id={task.id}>
      <p className="task-subject">{task.subject}</p>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-date">Срок: <time dateTime={task.dueDate}>{formatDate(task.dueDate)}</time></p>
      <p className="task-status"><span>{task.completed ? 'Выполненное' : 'Активное'}</span><span className={`status status-${status.className}`}>{status.label}</span></p>
      <div className="task-actions"><a className="button button-quiet" href={`#edit/${task.id}`}>Редактировать</a></div>
    </article>
  );
}
