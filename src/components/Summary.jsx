import React from 'react';
import { taskStatistics } from '../domain/urgency.js';

export default function Summary({ tasks, today }) {
  const counts = taskStatistics(tasks, today);
  return (
    <dl className="summary" aria-label="Общее количество заданий">
      <div className="summary-item"><dt>Активные</dt><dd data-count="active">{counts.active}</dd></div>
      <div className="summary-item"><dt>Выполненные</dt><dd data-count="completed">{counts.completed}</dd></div>
      <div className="summary-item"><dt>Просроченные среди активных</dt><dd className="overdue-count" data-count="overdue">{counts.overdue}</dd></div>
    </dl>
  );
}
